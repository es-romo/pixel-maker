const express = require('express')
const routes = require('../../routes')

async function expressLoader( app, admin ){
    routes(app,admin)
    app.use(express.json())
}

module.exports = expressLoader