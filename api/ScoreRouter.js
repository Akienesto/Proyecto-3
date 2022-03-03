const express = require("express");
const Score = require("../models/Score");
const ScoreRouter = express.Router();
const auth = require("../middleware/auth")


ScoreRouter.post("/newScore", auth, async (req, res) =>{
    const {score} = req.body
    const user = req.user.id
    try {
    let scores = new Score({
        score,
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