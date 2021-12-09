const _ = require("lodash")
const axios = require("axios")



module.exports = async function entry(params){
    // checkParams(params)
    return await request(params)
}

async function request(params){
    const BASE_URL = "http://waterservices.usgs.gov/nwis/iv/"
    try{
        const res = await axios.get(BASE_URL,{params})
        return res
    } catch(err){
        return err
    }
    
}


function checkParams(params){
    const any = (...els) => els.some(el => el)
    const errMessage =  "Params must contain either a Valid Name, Code or Lat/Lon"
    if(!params) throw new Error(errMessage) 
    const {lat, lon, name, code} = params 
    if(!any(lat, lon, name, code)) throw new Error(errMessage) 
    if(!name && !code){
        if(!any(lat, lon)) throw new Error(errMessage) 
    }
    return params 
}

function retrieveByName(name){
    name = _.toUpper(_.trim(name))
}