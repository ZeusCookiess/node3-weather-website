const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=fae638137d4f8a39d314ea2e6bca1a6e&query='+ latitude + ',' + longitude + '&units=m'
    // const URL = 'http://api.weatherstack.com/current?access_key=fae638137d4f8a39d314ea2e6bca1a6e&query=2323,-122.4233&units=m'
  
    
    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to weather services', undefined)          
        } else if(body.error){
            callback('Unable to find location', undefined)        
        } else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' But it feels like ' + body.current.feelslike)      
        }
    })
    

 
}

module.exports = forecast