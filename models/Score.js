const mongoose = require("mongoose")


const ScoreSchema = new mongoose.Schema({
    score:{
        type: Number,
        // required: true
    },
    // user:{
    //     type: mongoose.Types.ObjectId,
    //     ref: "User"
    // },
    movie:{
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    }
},{timestamps:true}
)


module.exports = mongoose.model("Score",ScoreSchema)