const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000


// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup hbs engine and views location
app.set('views',viewPath)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)

//Setup static directory to server
app.use(express.static(publicDir))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Zeyad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zeyad'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Use /weather to get the latest forecast',
        title: 'Help'
    })
})

app.get('/weather',  (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    
    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        
        if (error) {
            return res.send({
                error
            })
        } 
        forecast(latitude,longitude,(error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


app.get('/help/*', (req,res) => {
    res.render('errorpage', {
        message: 'help article not found',
        name: 'Zeyad',
        title: '404'
    })
})

app.get('*', (req,res) => {
    res.render('errorpage', {
        message: 'Page not found',
        name: 'Zeyad Mohamed',
        title: '404'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})