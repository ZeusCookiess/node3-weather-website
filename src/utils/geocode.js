const request = require('postman-request')


const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiemV1c2Nvb2tpZXMiLCJhIjoiY2t1MGR6YzliMjRyZDJwcXR5aXExNDVmZiJ9.ZDQYLptDbAlNRhI8sRFt7w'
    request({url, json: true}, (error,{body}) => {
        
        if (error){
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0){ 
            callback('Unable to locate the given location', undefined)
        } else {
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })



    
}

module.exports = geoCode