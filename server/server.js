require('dotenv').config()

const express = require('express')
const load = require('./loaders')

async function startServer(params) {
    let app = express()
    await load(app)

    app.listen(process.env.PORT, err =>{
        if (err) {
            console.log(err)
            return;      
        }else{
            console.log(`Listening at http://localhost:${process.env.PORT || 8080}`)
        }
    })
}

startServer()