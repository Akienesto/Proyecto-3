const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("dotenv").config();
const cloudinary = require('cloudinary').v2
const UserRouter = require("./api/UserRouter")
const MovieRouter = require("./api/MovieRouter")
const CommentsRouter = require("./api/CommentsRouter")
const ScoreRouter = require("./api/ScoreRouter")
const ActorsRouter = require("./api/ActorsRouter")
const ImageRouter = require("./api/ImageRouter")
const CharacterRouter = require("./api/CharacterRouter")


app.use(express.json({extended:true}))
app.use(express.urlencoded())
app.use("/api", UserRouter)
app.use("/api", MovieRouter)
app.use("/api", CommentsRouter)
app.use("/api", ScoreRouter)
app.use("/api", ActorsRouter)
app.use("/api", ImageRouter)
app.use("/api", CharacterRouter)


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