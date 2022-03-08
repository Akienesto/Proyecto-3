const express = require("express");
const Movie = require("../models/Movie");
const MovieRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const Actors = require("../models/Actors");


MovieRouter.post("/newMovie", auth, async (req, res) =>{
    const {title, year, argument, genre, image} = req.body
    const user = req.user.id
    const {cast} = req.params
    try {
        let movie = new Movie({
        title,
        year,
        argument,
        genre,
        image
    })
    if(!user){
        return res.status(400).send({
            succes: false,
            message: "Primero logueate"
        })
    }

    await movie.save()
    return res.status(200).send({
        succes: true,
        movie
    })
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

MovieRouter.put("/modifyMovie/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params
    const {title, year, argument, cast, genre, image} = req.body            
    try {
    await Movie.findByIdAndUpdate(id, {title, year, argument, cast, genre, image})    
    return res.status(200).send({
        succes:true,
        message: "Película modificada"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

MovieRouter.delete("/deleteMovie/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params           
    try {
    await Movie.findByIdAndDelete(id)    
    return res.status(200).send({
        succes:true,
        message: "Película borrada"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

MovieRouter.get("/getMovie/:id", async (req, res)=>{
    const {id} = req.params
    try {
        let movie = await Movie.findById(id).
        populate({ path: 'comment', select: 'comment' }).
        populate({ path: 'score', select: 'score' }).
        populate({ path: 'cast', select: 'name' })
        return res.status(200).send({
            succes: true,
            movie
        })
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
 
})

MovieRouter.get("/allMovies", async (req, res)=>{
    let allMovies = await Movie.find({})
    return res.status(200).send({
        succes:true,
        allMovies
    })
})

MovieRouter.post("/likes", auth, async (req, res) => {
    const {movieId, action } = req.body;
    const {id} = req.user
    try {
      switch (action) {
        case "like":
          await Movie.findByIdAndUpdate(movieId, { $push: { likes: id} });
          break;
  
        case "unlike":
          await Movie.findByIdAndUpdate(movieId, { $pull: { likes: id} });
          break;
  
        default:
          break;
      }
  
      return res.status(200).send({
        success: true,
      })
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
  })

module.exports = MovieRouter;