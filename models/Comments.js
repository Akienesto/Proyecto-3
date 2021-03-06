const mongoose = require("mongoose")


const CommentsSchema = new mongoose.Schema({
    comment:{
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    movie: {
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    },
    name: {
        type: String
    },
    // header: {
    //     type: String,
    //     required: true
    // }
},{timestamps:true}
)


module.exports = mongoose.model("Comments",CommentsSchema)