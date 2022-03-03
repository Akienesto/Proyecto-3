const jwt = require("jsonwebtoken")


const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization")

        if(!token){
            return res.status(400).send({
                succes:false,
                message: "Credenciales erroneas"
            })
        }

        jwt.verify(token, process.env.ACCES_TOKEN_SECRET, (err, user) =>{
            if(err) return res.status(400).send({
                succes: false,
                message: "Credenciales erroneas(2)"
            })
        
        req.user = user
        next()
    })
    } catch (error) {
        return res.status(400).send({
            succes:false,
            message: err.message
        })
    }
}


module.exports = auth