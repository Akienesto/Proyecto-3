const mongoose = require("mongoose")


const ActorsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    born: {
        type: Number,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image:{
        type: String,
    },
    films: [{
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    }, ],
    characters: [{
        type: mongoose.Types.ObjectId,
        ref: "Character"
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model("Actors", ActorsSchema)