const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    imageName: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

}, {
    timestamps: true
})

module.exports = mongoose.model("Image", ImageSchema)