const { Notification } = require("../db.js")

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
    putNotification,
}