const express = require("express");
const User = require("../models/User");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const auth = require("../middleware/auth");
const Movie = require("../models/Movie")


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

    if(!email || !name || !password){
        return res.send({
            succes: false,
            message:"completa todos los campos"
        })
    }
    if(name.length > 15){
        return res.send({
            succes: false,
            message:"Nombre demasiado largo"
        })
    }
    if(password.length < 6){
        return res.send({
            succes: false,
            message:"Contraseña demasiado corta"
        })
    }

    await usuario.save()
    return res.send({
        succes: true,
        message:"Usuario creado correctamente",
        usuario
    })
}
    catch (error) {
        return res.send({
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

UserRouter.delete("/deleteUser", auth, async (req,res) =>{
    const {id} = req.user           
    try {
    await User.findByIdAndDelete(id)    
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

UserRouter.get("/getUser", auth, async (req, res) =>{
    const {id} = req.user
    try {
        let user = await User.findById(id).
        populate({ path: 'list', select: 'title image' })
        if (!user) {
        return res.send({
                succes: false,
                message: "Usuario no encontrado"
            })
        }

        return res.send({
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
        return res.send({
            succes: false,
            message: "Credenciales erroneas"
        })
    }
    if (!email || !password) {
        return res.send({
            succes: false,
            message: "No has completado todos los campos"
        })
    }
    if(!user){
        return res.send({
            succes: false,
            message: "Usuario no registrado"
        })
    }
    let passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        return res.send({
            succes: false,
            message: "Credenciales erroneas"
        })
    }
    const token = accesToken({id:user._id})
    return res.status(200).send({
        succes: true,
        message: "Usuario logueado correctamente",
        token,
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

//   UserRouter.post("/list/:movieId", auth, async (req, res) => {
//     const { movieId } = req.params;
//     const { action } = req.body;
//     const {id} = req.user
//     try {
//       switch (action) {
//         case "añadir":
//           await User.findByIdAndUpdate(id, { $push: { list: movieId } });
//           break;
  
//         case "quitar":
//           await User.findByIdAndUpdate(id, { $pull: { list: movieId} });
//           break;
  
//         default:
//           break;
//       }
  
//       return res.send({
//         success: true,
//       })
//     } catch (error) {
//         return res.send({
//             succes: false,
//             message: error.message
//         })
//     }
//   })

// UserRouter.post("/list/:movieId", auth, async (req, res) => {
//     try {
//         const {id} = req.user
//         const {movieId} = req.params
//         const user = await User.findById(id)
//         let favorit = false
//         const peli = await Movie.findById(movieId)
//         user.list.forEach(e => {
//             if (e._id == peli){
//                 favorit = true
//             }
//         });
//         if (favorit == false){
//             await User.findByIdAndUpdate(id,{
//                 $push : {list : peli}
//             })
//         }else {
//             await User.findByIdAndUpdate(id,{
//                 $pull : {list : peli}
//             })
//         }
//         let peliculas = user.list
//         res.status(200).send({
//             succes : true,
//             peliculas
//         })
        
//     } catch (error) {
//         res.status(500).send({
//             succes : false,
//             message : error.message
//         })
//     }

// })

UserRouter.post("/list/:movieId", auth, async (req, res) => {
    try {
        const { movieId } = req.params;
        const  id  = req.user.id;
        console.log(id)
        // let findMovie = await Movie.findById(movieId)
        let user = await User.findById(id)
        let encontrarPeli = await user.list.find(pelicula => pelicula._id.equals(movieId))
        console.log(user)
        if (encontrarPeli) {
            await User.findByIdAndUpdate(id,{
                $pull : {list : movieId}
            })
            return res.send({
                succes : true,
                message : "Película eliminada de favoritos"
            })
        } 
        if (!encontrarPeli){
            await User.findByIdAndUpdate(id,{
                $push : {list : movieId}
            })
            return res.send({
                succes : true,
                message : "Película añadida a favoritos"
            })
        }
        
    } catch (error) {
        return res.status(500).send({
            succes : false,
            message : error.message
        })
    }
 
})


const accesToken =(user) =>{
    return jwt.sign(user, process.env.ACCES_TOKEN_SECRET,{expiresIn:"1d"})
}
module.exports = UserRouter;

// UserRouter.get("/allUsers", auth, async (req, res)=>{
//     let allUsers = await User.find({})
//     return res.status(200).send({
//         succes:true,
//         allUsers
//     })
// })