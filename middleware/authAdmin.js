const User = require("../models/User")

const authAdmin = async (req, res, next) =>{
    try {
        const user = await User.findOne({
            _id: req.user.id
        })

        if(user.role === 0){
            return res.status(400).send({
                succes: false,
                message: "You are not admin"
            })
        }
        next()
    } catch (error) {
        return res.status(500).send({
            succes: false,
            message: error.message
        })
    }
}

module.exports = authAdmin