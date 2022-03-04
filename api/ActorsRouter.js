const express = require("express");
const Actors = require("../models/Actors");
const ActorsRouter = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


ActorsRouter.post("/newActor", auth, async (req, res) =>{
    const {name, born, bio, films } = req.body
    const user = req.user.id
    try {
        let actor = new Actors({
        name,
        born,
        bio,
        films
    })
    if(!user){
        return res.status(400).send({
            succes: false,
            message: "Primero logueate"
        })
    }

    await actor.save()
    return res.status(200).send({
        succes: true,
        actor
    })
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

ActorsRouter.put("/modifyActor/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params
    const {name, born, bio, films} = req.body            
    try {
    await Actors.findByIdAndUpdate(id, {name, born, bio, films})    
    return res.status(200).send({
        succes:true,
        message: "Actor modificado"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

ActorsRouter.delete("/deleteActor/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params           
    try {
    await Actors.findByIdAndDelete(id)    
    return res.status(200).send({
        succes:true,
        message: "Actor borrado"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

ActorsRouter.get("/getActor/:id", async (req, res)=>{
    const {id} = req.params
    try {
        let actor = await Actors.findById(id)
        return res.status(200).send({
            succes: true,
            actor
        })
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
 
})

ActorsRouter.get("/allActors", async (req, res)=>{
    let allActors = await Actors.find({})
    return res.status(200).send({
        succes:true,
        allActors
    })
})


module.exports = ActorsRouter;