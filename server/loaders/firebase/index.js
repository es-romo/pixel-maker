
const admin = require('firebase-admin')
const path = require('path')

const credentials = path.join(process.cwd(),process.env.SERVICEACCOUNT.toString());
const serviceAccount = require( credentials );

async function firebaseLoader(){

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    return admin
}

module.exports = firebaseLoader