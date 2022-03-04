const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth")


UserRouter.post("/newUser", async (req, res) =>{
    const {name, email, password, role} = req.body
    try {
    let passwordHash = bcrypt.hashSync(password, 10)
    let usuario = new User({
        name,
        email,
        password: passwordHash,
        role,
    })

    if(password.length < 6){
        return res.status(400).send({
            succes: false,
            message:"Contraseña demasiado corta"
        })
    }

    await usuario.save()
    return res.status(200).send({
        succes: true,
        usuario
    })
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

UserRouter.put("/modifyUser/:id", auth, async (req,res) =>{
    const {id} = req.params
    const user = req.body             
    try {
    await User.findByIdAndUpdate(id, user)    
    return res.status(200).send({
        succes:true,
        message: "Usuario modificado",
        user
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

UserRouter.delete("/deleteUser/:id", auth, async (req,res) =>{
    const {id} = req.params
    const user = req.body             
    try {
    await User.findByIdAndDelete(id, user)    
    return res.status(200).send({
        succes:true,
        message: "Usuario borrado"
    })
} 
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

UserRouter.get("/findUser/:id", auth, async (req, res) =>{
    const {id} = req.params
    try {
        let user = await User.findById(id)
        if (!user) {
        return res.status(400).send({
                succes: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).send({
            succes: true,
            message: "Usuario encontrado",
            user
        })


    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

UserRouter.post("/login", async (req, res) =>{
    const {email, password } = req.body
    try {
    let user = await User.findOne({email})
    if (!password) {
        return res.status(400).send({
            succes: false,
            message: "Credenciales erroneas"
        })
    }
    if (!email || !password) {
        return res.status(400).send({
            succes: false,
            message: "No has completado todos los campos"
        })
    }
    if(!user){
        return res.status(400).send({
            succes: false,
            message: "Usuario no registrado"
        })
    }
    let passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        return res.status(400).send({
            succes: false,
            message: "Credenciales erroneas"
        })
    }
    const token = accesToken({id:user._id})
    return res.status(200).send({
        succes: true,
        message: "Usuario logueado correctamente",
        token
    })
    
}
    catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
})

  UserRouter.post("/list", auth, async (req, res) => {
    const { movieId, action } = req.body;
    const {id} = req.user
    try {
      switch (action) {
        case "add":
          await User.findByIdAndUpdate(id, { $push: { list: movieId } });
          break;
  
        case "drop":
          await User.findByIdAndUpdate(id, { $pull: { list: movieId} });
          break;
  
        default:
          break;
      }
  
      return res.status(200).send({
        success: true,
      })
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
  })

const accesToken =(user) =>{
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET,{expiresIn:"7d"})
}
module.exports = UserRouter;

// UserRouter.get("/allUsers", auth, async (req, res)=>{
//     let allUsers = await User.find({})
//     return res.status(200).send({
//         succes:true,
//         allUsers
//     })
// })