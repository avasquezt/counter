const express = require('express')
const app = express()
const connectDB = require('./config/database')
const homeRoutes = require('./routes/home')

// Read .env file
require('dotenv').config( {path: "./config/.env"} )

// DB Connection
connectDB()

// Serving static files
app.use(express.static('public'))

// Using EJS for views
app.set("view engine", "ejs");

// Middleware functions to parse the body of the requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routers
app.use('/', homeRoutes)

// Starting the server
app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`)
})