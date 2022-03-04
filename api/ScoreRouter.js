const express = require("express");
const Score = require("../models/Score");
const ScoreRouter = express.Router();
const auth = require("../middleware/auth")


ScoreRouter.post("/newScore/:movieId", auth, async (req, res) =>{
    const {score} = req.body
    const {movieId} = req.params
    const user = req.user.id
    try {
    let scores = new Score({
        score,
        movie: movieId,
        user
    })

    await scores.save()
    return res.status(200).send({
        succes: true,
        scores
    })
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})


module.exports = ScoreRouter;