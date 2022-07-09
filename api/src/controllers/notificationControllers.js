const { User, Notification } = require("../db.js")

const postNotification = async (req, res, next) => {
   const {subCreator, subReceiver, type} = req.body
    
    try {
        const userCreator = await User.findByPk(subCreator)
        const userReceiver = await User.findByPk(subReceiver)

        let text = ""

        switch (type) {
            case "newAnswer":
                text = `${userCreator.name} respondió tu pregunta!`
                break
            default:
                break
        }

        const newNotification = await userReceiver.createNotification({text, subCreator})

        res.send(newNotification)

   } catch (error) {
        next(error)
   }
}

const putNotification = async (req, res, next) => {
    const {id, statusRead} = req.body
     
     try {
         const notification = await Notification.findByPk(id)
         await notification.update({statusRead})

         res.send(notification)
 
    } catch (error) {
         next(error)
    }
 }

module.exports = {
    postNotification,
    putNotification,
}