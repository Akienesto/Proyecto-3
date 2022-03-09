const mongoose = require("mongoose")


const MovieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    year:{
        type: Number,
        required: true
    },
    argument:{
        type: String,
        required: true
    },
    cast: [{
        type: mongoose.Types.ObjectId,
        ref: "Actors"
    },],
    image:{
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    comment:[
        {
        type: mongoose.Types.ObjectId,
        ref: "Comments"
    },
],
    likes:{
        type: Array
    },
    score:[
        {
        type: mongoose.Types.ObjectId,
        ref: "Score"
    },
],
    characters: [{
        type: mongoose.Types.ObjectId,
        ref: "Character"
    },]

},{timestamps:true}
)


module.exports = mongoose.model("Movie",MovieSchema)