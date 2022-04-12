const mongoose = require("mongoose")


const CharacterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    actors: [{
        type: mongoose.Types.ObjectId,
        ref: "Actor"
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
    images:{
        type: String,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Character", CharacterSchema)