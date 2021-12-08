const dataRetrieval = require("./data-retrieval")
describe("Data Retrieval should make requests to USGS API and get correct data", ()=> {
    const params ={
        name: "STEWART LAKE OUTFLOW NEAR JENSEN, UT",
        lat: 41.96591667, lon: -111.3981778,
        code: 10055000
    }
    const properParams ={
        format: 'json',
        indent: 'on',
        stateCd: 'ut',
        parameterCd: '00060,00065',
        siteType: 'LK',
        siteStatus: 'all'
    }


    describe("The basic response from the request should be valid", ()=>{
        it("should get 200 response", () => {
            const name = params.name
            expect(dataRetrieval({name}).status).toBe(200)
        })
        it.only("should be in JSON format", async ()=>{
            
            const res = await dataRetrieval(properParams)
            console.log({res})
            expect(res.headers).toBe('application/json')
        })
    })
    describe("The function should be able to accept proper params", ()=> {
        const errMessage = "Name, Code or Lat/Lon"
        it("should throw an errow if not presented with proper params", () => {
            expect(dataRetrieval({random: "property"})).rejects.toThrow(errMessage)
            expect(dataRetrieval()).rejects.toThrow(errMessage)
        })
        it("should accept Name of the Waterway", ()=> {
            const name = params.name
            expect(dataRetrieval({name})).resolves.not.toThrow(errMessage)
            expect(dataRetrieval({name: name.toLowerCase()})).resolves.not.toThrow(errMessage)
        })
        it("should accept Lat / Lon of the Waterway", ()=>{
            const {lat, lon} = params
            expect(dataRetrieval({lat, lon})).resolves.not.toThrow(errMessage)
        })
        it("should accept Code of the Waterway", ()=>{
            const code = params.code
            expect(dataRetrieval({code})).resolves.not.toThrow(errMessage)
        })
    })
    describe("The Function should return necessary data", () => {
        it.todo("should have the Name of the Waterway")
        it.todo("should have the Lat / Lon of the Waterway")
        it.todo("should have the Code of the Waterway")
    })
    


    
})