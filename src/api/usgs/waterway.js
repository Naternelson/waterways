import axios from 'axios'
import codes from './waterway-codes'
import stateCodes from 'fips-state-codes'
import {getBounds, getBoundsOfDistance, getDistance} from 'geolib'
import converter from 'conversions'


class Waterway{
    // ====================
    // Static Variables
    // ====================
    // A dynamic object, that returns the string associated with the VariableCode from USGS 
    static codes = {}

    // ====================
    // Serialize Collection
    // ====================
    static serialize(list){
        if(!Array.isArray(list)){
            list = Object.values(list)
        } 
        return list.map((el)=>{
            try{
                return el.serialize()
            } catch {
                return el 
            }
        })
    }
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
        const {maxLat, minLat, maxLng, minLng} = getBounds(getBoundsOfDistance(coord, distance))
        return [minLng, minLat, maxLng, maxLat].map(el => Number(el).toFixed(7).toString()).join(",")
        
    }

    // ====================
    // Generate Instances
    // ====================
    // A Helper function to process the raw data from Waterways.retrieveArea
    static generateInstances = (rawData, coords, maxDistance) => {

        const waterways = {}
        const tss = rawData.value.timeSeries
        tss.forEach((ts) => {
            const si = ts.sourceInfo
            const vi = ts.variable 
            // const val = ts.values[0].value[0]
            const val = ts.values[0].value[ts.values[0].value.length -1]
            if(!val || !val.value) return  
            const siteCode = si.siteCode[0].value

            if(!(siteCode in waterways)){
                // ====================
                // For Each SiteCode 
                // ====================
                let args = {
                    id: siteCode,
                    name: si.siteName, 
                    coord: {latitude: si.geoLocation.geogLocation.latitude, longitude: si.geoLocation.geogLocation.longitude}
                } 
                args = si.siteProperty.reduce((obj, el)=>{
                    obj[el.name] = el.value
                    return obj 
                }, args) 
                args.distance =  getDistance(coords, args.coord)
                if(coords && maxDistance && args.distance > maxDistance) return
                waterways[siteCode] = new this(args)
            }
            this.codes[vi.variableCode[0].value] = vi.variableDescription
            const waterway = waterways[siteCode] 
            waterway.data[vi.variableCode[0].value] = {
                noData: val.value == vi.noDataValue, 
                value: val.value, 
                dateTime: val.dateTime, 
                unit: vi.unit.unitCode,
                description: vi.variableDescription
            } 
        })
        return Object.values(waterways) 
    }
    static retrieveArea = async ({latitude, longitude, radius=100, unitType="miles"}) => {
        // ====================
        // Main Entry Point to Search area
        // Here We make our API Call
        // ====================
        if(!latitude){
            latitude = 41.165740
            longitude = -112.025970
        }
        const params = {
            format: "json",
            indent: "on",
            siteType: 'LK,ST',
            siteStatus: 'active',
            period: 'P1D'
            // parameterCd: this.paramCodes
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
            this.name = props.name.toUpperCase()
        }
        if(props.stateCd){
            this.state = stateCodes[props.stateCd]
        }
    }
    serialize(){
        const startObj = {lastUpdatedOn: this.lastUpdatedOn } 
        return Object.keys(this).reduce((obj, key) =>  {
            obj[key] = this[key] instanceof Date ? this[key].toString() : this[key] 
            return obj
        },startObj)
    }
    get lastUpdatedOn(){
       return Object.values(this.data).sort((a,b) => Date(b.dateTime) - Date(a.dateTime))[0].dateTime
    }
}

export default Waterway