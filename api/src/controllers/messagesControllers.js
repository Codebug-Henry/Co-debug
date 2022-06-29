const { User, Message } = require("../db");
const { paginate } = require("./generalControllers");

const getAllMessages = async (req, res, next) => {

    const {page, limit} = req.query

    try {

        let allMessages = await Message.findAll({include: User,
            order: [
            ['createdAt', 'DESC'],
        ]})
        
        res.send(paginate(parseInt(limit), parseInt(page), allMessages))

    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllMessages
}