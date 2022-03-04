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
    cast: {
        type: Array,
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
]
},{timestamps:true}
)


module.exports = mongoose.model("Movie",MovieSchema)