const mongoose = require("mongoose")


const CommentsSchema = new mongoose.Schema({
    // comment: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "Movie",
    //   }
    comment:{
        type: String
    },
    user: [{
        type: mongoose.Types.ObjectId,
        ref: "User",
      }],
},{timestamps:true}
)


module.exports = mongoose.model("Comments",CommentsSchema)