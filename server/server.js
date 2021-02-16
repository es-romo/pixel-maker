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

//Routes
app.get('/', async (req,res) => {
    const pixels = await Pixel.find()
    res.send(pixels)
})

app.route('/pixel')
    
    .post( async (req, res) => {
        try{
            const pixel = new Pixel({
                name: req.body.name,
                available: true && req.body.available,
                created: Date.now()
            })
            await pixel.save()
            res.send(pixel)
        }catch(err){
            console.log(err)
        }
    })

app.route('/pixel/:id')
    .get( async (req,res)=>{
        const id = req.params.id
        console.log(id)
        res.send({
            message: id
        })
    })
    .patch(async ( req, res) => {
        try{
            console.log(req.params.id)
            const pixel = await Pixel.findOne({_id: req.params.id})
            if (req.body.name) pixel.name = req.body.name
            if (typeof req.body.available == 'boolean') pixel.available = req.body.available
            console.log(pixel.available)
            await pixel.save()
            res.send(pixel)
        }catch(err){
            res.status(404)
            .send({error: 'Pixel does not exist'})
        }
    })
    .delete(async (req, res)=>{
        try {
            await Pixel.deleteOne({ _id: req.params.id })
            res.status(204).send()
        } catch {
            res.status(404)
            .send({ error: "Pixel doesn't exist!" })
        }
    })