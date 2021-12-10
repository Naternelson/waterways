const geolib = require("geolib")
const converter = require("conversions")
const axios = require("axios")
const codes = require("./waterway-codes")
const _ = require("lodash")
const stateCodes = require("fips-state-codes")

class Waterway{
    // ====================
    // Static Variables
    // ====================
    // A dynamic object, that returns the string associated with the VariableCode from USGS 
    static codes = {}

    // ====================
    // Constants
    // ====================
    static apiUrl = "https://waterservices.usgs.gov/nwis/iv/"
    static paramCodes = Object.keys(codes).join(",")

    // ====================
    // Get Bounding Box
    // ====================
    // A helper function to create a square of coordinates around a given point and radius
    static getBoundingBox = (coord, distance) => {
        const {maxLat, minLat, maxLng, minLng} = geolib.getBounds(geolib.getBoundsOfDistance(coord, distance))
        return [minLng, minLat, maxLng, maxLat].map(el => Number(el).toFixed(7).toString()).join(",")
        
    }

    // ====================
    // Generate Instances
    // ====================
    // A Helper function to process the raw data from Waterways.retrieveArea
    static generateInstances = (rawData, coords, maxDistance) => {

        const waterways = {}
        const tss = rawData.value.timeSeries
        tss.forEach((ts, index) => {
            const si = ts.sourceInfo
            const vi = ts.variable 
            const val = ts.values[0].value[0]
            const siteCode = si.siteCode[0].value

            if(!(siteCode in waterways)){
                let args = {
                    id: siteCode,
                    name: si.siteName, 
                    coord: {latitude: si.geoLocation.geogLocation.latitude, longitude: si.geoLocation.geogLocation.longitude}
                } 
                args = si.siteProperty.reduce((obj, el)=>{
                    obj[el.name] = el.value
                    return obj 
                }, args) 
                // console.log({coords, maxDistance, distance: geolib.getDistance(coords, args.coord)})
                if(coords && maxDistance && geolib.getDistance(coords, args.coord) > maxDistance) {
                    return
                };
                waterways[siteCode] = new this(args)
            }
            this.codes[vi.variableCode[0].value] = vi.variableDescription
            const waterway = waterways[siteCode]
            waterway.data[vi.variableCode[0].value] = {
                noData: val.value == vi.notDataValue, 
                value: val.value, 
                dateTime: new Date(val.dateTime), 
                unit: vi.unit.unitCode,
                description: vi.variableDescription
            } 
        })
        return Object.values(waterways) 
    }
    static retrieveArea = async ({latitude, longitude, radius=100, unitType="miles"}) => {
        // if(!latitude){
        //     latitude = 41.165740,
        //     longitude = -112.025970
        // }
        const params = {
            format: "json",
            indent: "on",
            siteType: 'LK,ST',
            siteStatus: 'active',
            parameterCd: this.paramCodes
        }

        const meters = converter(radius, unitType, "metres")
        params.bBox =  this.getBoundingBox({latitude, longitude}, meters)
        try{
            const response = await axios.get(this.apiUrl, {params})
            return this.generateInstances(response.data, {latitude, longitude}, meters)
        } catch(err) {
            console.error(err)
        }
    }
    data = {}
    constructor(props){
        for(let key in props) this[key] = props[key]
        if(props.name){
            this.name = _.startCase(props.name.toLowerCase()) 
        }
        if(props.stateCd){
            this.state = stateCodes[props.stateCd]
        }
    }
}
module.exports = Waterway