const express = require("express");
const Comments = require("../models/Comments");
const CommentsRouter = express.Router();
const Movie = require("../models/Movie");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");


CommentsRouter.post("/newComment", auth, async (req, res) => {
    const { comment, movieId } = req.body
    const id = req.user.id
    try {
    let comentario = new Comments({
      comment,
      movie: movieId
    })
  
    let newComment = await comentario.save();
  
    let commentPost = await Movie.findByIdAndUpdate(id, {
      $push: { Comments: newComment._id },
    })
  
    return res.status(200).send({
      success: true,
      comment: newComment,
      commentPost
    })
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
  })

CommentsRouter.put("/modifyComment/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params
    const comment = req.body             
    try {
    await Comments.findByIdAndUpdate(id, comment)    
    return res.status(200).send({
        succes:true,
        message: "Comentario modificado",
        comment
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

CommentsRouter.delete("/deleteComment/:id", auth, authAdmin, async (req,res) =>{
    const {id} = req.params
    const comment = req.body             
    try {
    await Comments.findByIdAndDelete(id, comment)    
    return res.status(200).send({
        succes:true,
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

CommentsRouter.get("/getComment/:id",auth, authAdmin, async (req, res)=>{
    const {id} = req.params
    try {
        let comment = await Comments.findById(id).populate({path: `user`, select: `name`},)
        return res.status(200).send({
            succes: true,
            comment
        })
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
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