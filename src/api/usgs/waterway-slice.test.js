import reducer, {locationChanged,waterwayAdded,waterwayDeleted,waterwaysAdded,waterwaysDeleted,waterwaysLoading,waterwaysLoaded,waterwaysReset} from "./waterways-slice"
import Waterway from "./waterway"

describe("Waterway slice", () => {
    it("should initiate with default object", () => {
        expect(reducer(undefined, {})).toEqual({
            location: {},
            loading: true,
            data: {}
        })
    })
    describe("actions", () => {
        const waterwayCollection = []
        for(let i = 0; i < 3; i++){
            waterwayCollection.push((new Waterway({
                id: i, 
                data: {
                    "00020": {value: i, unit: i, dateTime: new Date(), description: i},
                    "00045": {value: i, unit: i, dateTime: new Date(), description: i}
                },
                name: `Site Number ${i}`,
                coord: {latitude: i, longitude: i},
                siteTypeCd: i,
                hucCd: i,
                stateCd: "49",
                state: "UT",
                countyCd: i
            })).serialize())
        }

        describe("locationChanged", () =>{
            it("should update the location in the store", () => {
                const state = {
                    location: {},
                    loading: true,
                    data: {}
                }
                const newLocation = {latitude: 100, longitude: 422}
                let newState = reducer(state, locationChanged(newLocation))
                expect(newState).toEqual({location: newLocation, loading: true, data: {}})
                newState = reducer(newState, locationChanged({latitude: 200, longitude: 100}))
                expect(newState).toEqual({location: {latitude: 200, longitude: 100}, data: {}, loading: true})
            })
        })
        describe("waterwayAdded", () =>{
            it("should add a waterway to the store", () => {
                let state = reducer(undefined, waterwayAdded(waterwayCollection[0]))
                expect(state).toEqual({
                    location: {},
                    loading: true, 
                    data: {
                        [waterwayCollection[0].id]: waterwayCollection[0] 
                    }
                })
            })
        })
        describe("waterwayDeleted", () =>{
            it("should remove a waterway to the store", () => {
                let state = reducer(undefined, waterwayAdded(waterwayCollection[0]))
                expect(state).toEqual({
                    location: {},
                    loading: true, 
                    data: {
                        [waterwayCollection[0].id]: waterwayCollection[0] 
                    }
                })
                state = reducer(state, waterwayDeleted(waterwayCollection[0].id))
                expect(state).toEqual(reducer(undefined, {}))
            })
        })
        describe("waterwaysAdded", () =>{
            const waterwaysObj = waterwayCollection.reduce((obj, el) =>{
                obj[el.id] = el
                return obj
            }, {}) 
            it("should add an array of Waterways to the store", () => {
                let oldState = reducer(undefined,{})
                const state = reducer(oldState, waterwaysAdded(waterwayCollection))
                expect(state).toEqual({
                    ...oldState, data: {...waterwaysObj}
                })
            })
            it("should add an object of Waterways to the store", ()=>{
                const oldState = reducer(undefined, {})
                const state = reducer(oldState, waterwaysAdded(waterwaysObj))
                expect(state).toEqual({...oldState, data: {...waterwaysObj}})
            })
        })
        describe("waterwaysDeleted", () =>{
            const waterwaysObj = waterwayCollection.reduce((obj, el) =>{
                obj[el.id] = el
                return obj
            }, {}) 
            it("should remove an array of ids from the store", () => {
                let oldState = reducer(undefined,waterwaysAdded(waterwayCollection))
                const ids = ["0", "1", "2"]
                const state = reducer(oldState, waterwaysDeleted(ids))
                ids.forEach(id => {
                    expect(state.data).not.toHaveProperty(id)
                })
            })
            it("should remove an array of Waterways to the store", ()=>{
                const oldState = reducer(undefined,waterwaysAdded(waterwayCollection))
                const toRemove = waterwayCollection.slice(1)
                const state = reducer(oldState, waterwaysDeleted(toRemove))
                
                const expected = {...oldState, data: {[waterwayCollection[0].id]: waterwayCollection[0]}}
                expect(state).toEqual(expected)
            })
        })
        describe("waterwaysLoading", ()=>{
            it("should change the loading state to true", () => {
                const oldState = reducer({loading: false}, {})
                const state = reducer(oldState, waterwaysLoading())
                expect(state.loading).toBeTruthy()
            })
        })
        describe("waterwaysLoaded", ()=>{
            it("should changed the loading state to false", () => {
                const oldState = reducer(undefined, {})
                const state = reducer(oldState, waterwaysLoaded())
                expect(state.loading).not.toBeTruthy()
            })
        })
        describe("waterwaysReset", ()=>{
            it("should reset to default", () => {
                const expected = reducer(undefined, {})
                const oldState = reducer(undefined, waterwaysAdded(waterwayCollection))
                const state = reducer(oldState, waterwaysReset())
                expect(state).toEqual(expected)
            })
        })
    })
})