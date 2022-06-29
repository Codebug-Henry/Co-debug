const { User, Message } = require("../db.js")

const postMessage = async (req, res, next) => {
   const {sub, title, text} = req.body
    
    try {
        const user = await User.findByPk(sub)
        const newMessage = await Message.create({title, text})
        newMessage.setUser(user)
        res.send({user, ...newMessage.dataValues})

   } catch (error) {
        next(error)
   }
}

module.exports = {
    postMessage
}