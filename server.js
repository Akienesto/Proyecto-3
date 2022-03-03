const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config();
const UserRouter = require("./api/UserRouter")
const MovieRouter = require("./api/MovieRouter")
const CommentsRouter = require("./api/CommentsRouter")
const ScoreRouter = require("./api/ScoreRouter")


app.use(express.json({extended:true}))
app.use(express.urlencoded())
app.use("/api", UserRouter)
app.use("/api", MovieRouter)
app.use("/api", CommentsRouter)
app.use("/api", ScoreRouter)


const URL= process.env.mongodb_url
mongoose.connect(URL, {
}).then(()=>{
    console.log("DB is connected")
}).catch(error =>{
    console.log(error)
})





const port = process.env.port || 5000
app.listen(port, () =>{
    console.log("Server is running on port 5000")
})