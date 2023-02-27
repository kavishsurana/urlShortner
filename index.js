const express = require("express")
const mongoose = require("mongoose")
//const connectDb = require("./config/db")
const config = require("config")

mongoose.set("strictQuery", false)

mongoose.connect('mongodb://127.0.0.1:27017/UrlShortner',{
    // useNewUrlParser: true,
    // useCreateIndex: true
})

const app = express()

//connectDb()

app.use(express.json({extended : false}))

app.use("/" , require("./routers/url"))


const port = config.get("port")

app.listen(port, () => {
    console.log(`Service endpoint http://localhost:${port}`)
})