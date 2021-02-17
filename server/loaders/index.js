const expressLoader = require('./express')
const mongooseLoader = require('./mongoose')
const firebaseLoader = require('./firebase')


async function loader ( app ){
    
    console.log('Initializing MongoDb...')
    await mongooseLoader()
    console.log('MongoDb initalized\n')
    
    console.log('Initializing Firebase...')
    const admin = await firebaseLoader( app )
    console.log('Firebase initalized\n')

    console.log('Initializing Express...')
    await expressLoader(app, admin)
    console.log('Express initalized\n')

}

module.exports = loader