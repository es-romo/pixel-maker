const Pixel = require('../models/Pixel.js')
const path = require('path')

function routes( app, admin ){

    async function checkAuth(req, res, next) {
        if (req.headers.authtoken) {
        admin.auth().verifyIdToken(req.headers.authtoken)
            .then(() => {
            next()
            }).catch(() => {
            res.status(403).send('Unauthorized')
            });
        } else {
        res.status(403).send('Unauthorized')
        }
    }

    //app.use('/pixel', checkAuth)
    //app.use('/pixel/:id', checkAuth)

    //Routes
    app.get('/', async (req,res) => {
        const pixels = await Pixel.find()
        res.send(pixels)
    })

    app.get('/img/:id', async (req, res) => {
        console.log("ptm")
        try{
            const pixel = await Pixel.findOne({ _id: req.params.id })
            pixel.accessed.push({
                date: Date.now(),
                ip: req.ip
            })
            await pixel.save()
        }catch(err){
            console.log(err)
        }
        res.sendFile(path.join(__dirname,'../assets/img.jpeg'))
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
}

module.exports = routes