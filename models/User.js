const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    list : [{
        type: mongoose.Types.ObjectId,
        ref: "Movie"
    }],
},{timestamps:true}
)


module.exports = mongoose.model("User",UserSchema)