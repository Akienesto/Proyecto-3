const express = require("express");
const CharacterRouter = express.Router();
const Character = require("../models/Character");
const Actors = require("../models/Actors");
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


CharacterRouter.post("/newCharacter", auth, async (req, res) =>{
    const {name, actors, films, year, bio, image} = req.body
    const user = req.user.id
    try {
        let character = new Character({
        name,
        actors,
        films,
        year,
        bio,
        image
    })
    if(!user){
        return res.send({
            succes: false,
            message: "Primero logueate"
        })
    }

    let newCharacter = await character.save();
  
    await Movie.findByIdAndUpdate(films, {
      $push: { characters: newCharacter._id }
    })

    // let newFilm = await actor.save();

    // await Actors.findByIdAndUpdate(movieId, {
    //     $push: { films: newFilm._id }
    // })

    await character.save()
    return res.status(200).send({
        succes: true,
        message: "Personaje creado correctamente",
        actors
    })
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

CharacterRouter.put("/modifyCharacter/:id", auth, async (req,res) =>{
    const {id} = req.params
    const {name, actors, films, year ,bio, images} = req.body            
    try {
    await Character.findByIdAndUpdate(id, {name, actors, films, year, bio, images})    
    return res.status(200).send({
        succes:true,
        message: "Personaje modificado"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

CharacterRouter.get("/getCharacter/:id", async (req, res)=>{
    const {id} = req.params
        try {
        let character = await Character.findById(id).
        populate({ path: 'films', select: 'title image' }).
        populate({ path: 'actors', select: 'name image' })
        return res.send({
            succes: true,
            character
        })

    } catch (error) {
        return res.send({
            succes: false,
            message: error.message
        })
    }
 
})

CharacterRouter.get("/allCharacters", async (req, res)=>{
    let allCharacters = await Character.find({})
    return res.send({
        succes:true,
        allCharacters
    })
})

CharacterRouter.delete("/deleteCharacter/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params           
    try {
    await Character.findByIdAndDelete(id)    
    return res.status(200).send({
        succes:true,
        message: "Personaje borrado"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

module.exports = CharacterRouter;