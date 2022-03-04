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
    films: [{
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    }, ],
}, {
    timestamps: true
})


module.exports = mongoose.model("Actors", ActorsSchema)