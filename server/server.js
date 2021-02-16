require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

//Express
let app = express()
    //Middleware
app.use(express.json())

//MongoDb
const Pixel = require('./models/Pixel.js')
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
    //Mongo Events
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    //Launch server
    app.listen(process.env.PORT,()=>{
        console.log(`Listening at http://localhost:${process.env.PORT}`)
    })
});
