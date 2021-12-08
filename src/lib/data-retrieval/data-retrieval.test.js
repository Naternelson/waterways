const dataRetrieval = require("./data-retrieval")
describe("Data Retrieval should make requests to USGS API and get correct data", ()=> {
    describe("The basic response from the request should be valid", ()=>{
        it.todo("should get 200 response")
        it.todo("should be in JSON format")
    })
    describe("The function should be able to accept proper params", ()=> {
        it("should throw an errow if not presented with proper params", () => {
            expect(dataRetrieval({random: "property"})).toThrow()
            expect(dataRetrieval()).toThrow()
        })
        it.todo("should accept Name of the Waterway")
        it.todo("should accept Lat / Lon of the Waterway")
        it.todo("should accept Code of the Waterway")
    })
    describe("The Function should return nessicary data", () => {
        it.todo("should have the Name of the Waterway")
        it.todo("should have the Lat / Lon of the Waterway")
        it.todo("should have the Code of the Waterway")
    })
    


    
})