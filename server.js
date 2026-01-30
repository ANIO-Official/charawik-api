require('dotenv').config()
require('./config/db-connection') //MongoConnection
const cors = require('cors')
const routes = require('./routes')
const express = require('express')

const app = express()
const port = process.env.PORT || 3020

//Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));

//Routes
app.use(routes);
 
//Listener
app.listen(port, () => console.log(`[ 🌐 Server Open on http://localhost:${port} ]`));