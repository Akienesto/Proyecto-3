const express = require("express");
const Comments = require("../models/Comments");
const CommentsRouter = express.Router();
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const User = require("../models/User");


CommentsRouter.post("/newComment/:movieId", auth, async (req, res) => {
    const { movieId } = req.params
    const { comment, header } = req.body
    const id = req.user.id
    try {
        let usuario = await User.findById(id)
        let nombre = usuario.name
        let comentario = new Comments({
            comment,
            header,
            movie: movieId,
            user: id,
            name: nombre
        })

        let newComment = await comentario.save();

        await Movie.findByIdAndUpdate(movieId, {
            $push: { comment: newComment }
        })

        return res.send({
            success: true,
            message: "Muchas gracias por tu comentario",
            newComment
        })
    }
    catch (error) {
        return res.send({
            succes: false,
            message: error.message
        })
    }
})

CommentsRouter.put("/modifyComment/:id", auth, async (req, res) => {
    const { id } = req.params
    const comment = req.body
    try {
        await Comments.findByIdAndUpdate(id, comment)
        return res.send({
            succes: true,
            message: "Comentario modificado",
            comment
        })
    }
    catch (error) {
        return res.send({
            succes: false,
            message: error.message
        })
    }
})

CommentsRouter.delete("/deleteComment/:id", auth, authAdmin, async (req, res) => {
    const { id } = req.params
    const comment = req.body
    try {
        await Comments.findByIdAndDelete(id, comment)
        return res.status(200).send({
            succes: true,
            message: "Comentario borrado"
        })
    }
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

CommentsRouter.get("/getComment/:id", async (req, res) => {
    const { id } = req.params
    try {
        let comment = await Comments.findById(id).populate({ path: `user`, select: `name _id` },)
        return res.send({
            succes: true,
            comment
        })
    } catch (error) {
        return res.send({
            succes: false,
            message: error.message
        })
    }
})

CommentsRouter.get("/allComments", async (req, res) => {
    let allComments = await Comments.find({})
    return res.status(200).send({
        succes: true,
        allComments
    })
})

// CommentsRouter.get("/getComment/:id", async (req, res) => {
//   const id = req.params
//   let comments = await Comments.findById(id);

//   let userId = comments.userId; 

//   const userInfo = await User.findById(userId, "name");
//   return res.json({
//     success: true,
//     comments,
//     userInfo,
//   });
// });

module.exports = CommentsRouter;