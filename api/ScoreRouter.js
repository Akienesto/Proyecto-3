const express = require("express");
const Score = require("../models/Score");
const ScoreRouter = express.Router();
const Movie = require("../models/Movie");
const auth = require("../middleware/auth")
const User = require("../models/User");


ScoreRouter.post("/newScore/:movieId", auth, async (req, res) => {
    const { score } = req.body
    const { movieId } = req.params
    const id = req.user.id
    try {
        let usuario = await User.findById(id)
        let nombre = usuario.name
        let scores = new Score({
            score,
            user: id,
            name: nombre
        })

        // if (id === usuario.id)
        // return res.send({
        //     succes: false,
        //     message: "Ya has puntuado esta pelicula"
        // })

        let newScore = await scores.save();

        await Movie.findByIdAndUpdate(movieId, {
            $push: { score: newScore }
        })


        await scores.save()
        return res.send({
            succes: true,
            message: "Gracias por tu puntuación",
            newScore
        })
    }
    catch (error) {
        return res.send({
            succes: false,
            message: error.message
        })
    }
})

ScoreRouter.get("/getScore/:id", async (req, res) => {
    const { id } = req.params
    try {
        let score = await Score.findById(id).
            populate({ path: 'score', select: 'score user' })
        return res.send({
            succes: true,
            score
        })

    } catch (error) {
        return res.send({
            succes: false,
            message: error.message
        })
    }

})


module.exports = ScoreRouter;