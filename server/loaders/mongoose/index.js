const mongoose = require('mongoose')

async function mongooseLoader(){
    mongoose.connect(process.env.DB, 
        {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    return db
}

module.exports = mongooseLoader