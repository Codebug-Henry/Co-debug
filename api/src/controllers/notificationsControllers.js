const { Notification } = require("../db");

const getNotifications = async (req, res, next) => {

    const {sub} = req.params

    try {

        const myNotifications = await Notification.findAll({
            where: {userSub: sub, statusRead: false},
            order: [['createdAt', 'DESC']]
        })

        const total = myNotifications.length

        res.send({total, results: myNotifications})
        
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getNotifications
}