const mongoose = require("mongoose")


const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actors: [{
        type: mongoose.Types.ObjectId,
        ref: "Actors"
        },],
    films: [{
        type: mongoose.Types.ObjectId,
        ref: "Movie"
        },],
    year: {
        type: String,
    },
    bio: {
        type: String,
    },
    image:{
        type: String,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Character", CharacterSchema)