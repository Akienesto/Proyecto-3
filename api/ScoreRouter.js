const express = require("express");
const Score = require("../models/Score");
const ScoreRouter = express.Router();
const Movie = require("../models/Movie");
const auth = require("../middleware/auth")


ScoreRouter.post("/newScore/:movieId", auth, async (req, res) =>{
    const {score} = req.body
    const {movieId} = req.params
    const id = req.user.id
    try {
    let scores = new Score({
        score,
        movie: movieId,
        id
    })

    // db.score.aggregate( [{ $group: {_id: "$score",avgScores: { $avg: "$score" } } }] )

    let newScore = await scores.save();
  
    await Movie.findByIdAndUpdate(movieId, {
      $push: { score: newScore._id }, 
    })
    

    await scores.save()
    return res.status(200).send({
        succes: true,
        newScore
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