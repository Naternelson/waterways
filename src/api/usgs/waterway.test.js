const Waterway = require("./waterway")
const stateCodes = require("fips-state-codes")
const geolib = require("geolib")
const converter = require("conversions")

describe("Waterway.retrieveArea should be able to make api call to waterservice.usgs.gov", ()=>{
    const params = {
        latitude: 41.3024159,
        longitude: -112.0475231,
        radius: 50, 
        unitType: "miles"
    }
    const waterwayPromise = Waterway.retrieveArea(params)
    it("should be able to accept lat,lon, radius and unit", ()=>{
        expect(waterwayPromise).resolves.toBeTruthy()
    })
    it("should return a collection of Waterway instances", async () => {
        const data = await waterwayPromise
        expect(Array.isArray(data)).toBeTruthy()
        const waterway = data[0]
        expect(waterway.id).toBeTruthy()
        expect(waterway.data).toBeTruthy()
    })
    describe("waterway instance", () =>{
        it("should have an id, name, coord, data, siteTypeCd, hucCd, state, stateCd, countyCd", async () => {
            const data = await waterwayPromise
            //Last 10 values of data
            for(const i = data.length - 1; i < data.length - 11; i-- ){
                if(i < 0) break;
                expect(data[i]).toHaveProperty("id")
                expect(data[i]).toHaveProperty("name")
                expect(data[i]).toHaveProperty("coord")
                expect(data[i]).toHaveProperty("data")
                expect(data[i]).toHaveProperty("siteTypeCd")
                expect(data[i]).toHaveProperty("hucCd")
                expect(data[i]).toHaveProperty("stateCd")
                expect(data[i]).toHaveProperty("state")
                expect(stateCodes[data[i].stateCd]).toEqual(data[i].state)
                expect(data[i]).toHaveProperty("countyCd")
            }
        })
        it("should have data object with list of properties", async () => {
            const data = await waterwayPromise
            //Last 10 values of data
            for(const i = data.length - 1; i < data.length - 11; i-- ){
                if(i < 0) break;
                for(const key in data[i].data){
                    expect(Number(key)).not.toBeNaN()
                    const {value, unit, dateTime, description} = data[i].data[key]
                    expect(value).toBeTruthy()
                    expect(unit).toBeTruthy()
                    expect(description).toBeTruthy()
                    expect(dateTime).toBeInstanceOf(Date)
                    const tenDaysAgo = (new Date()).getDate() - 10
                    expect(dateTime).toBeGreaterThanOrEqual(tenDaysAgo)
                }
            }
        })
        it("should not return instances outside of radius", async () =>{
            const data = await waterwayPromise
            data.forEach(w => {
                const center = {latitude: params.latitude, longitude: params.longitude}
                const expected = geolib.isPointWithinRadius(w.coord, center, converter(params.radius, params.unitType, "metres"))
                expect(expected).toBeTruthy()
            })
        })
    })
})