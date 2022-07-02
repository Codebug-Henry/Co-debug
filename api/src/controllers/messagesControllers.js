const { User, Message } = require("../db");
const { paginate } = require("./generalControllers");
const { Op } = require('sequelize');

const getAllMessages = async (req, res, next) => {

    const {page, limit, answered} = req.query

    try {
        let condition = {}
        switch (answered) {
            case "true":
                condition = {...condition, answer: {[Op.not]: null}}
                break
            case "false":
                condition = {...condition, answer: {[Op.is]: null}}
                break
            default:
                break
        }

        let allMessages = await Message.findAll({where: condition, include: User,
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