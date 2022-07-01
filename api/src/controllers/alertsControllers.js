const { Question, Answer, Alert } = require("../db");
const { paginate } = require("./generalControllers");
const { Op } = require('sequelize');

const getAllAlerts = async (req, res, next) => {

    const {page, limit, resolved} = req.query

    try {
        let condition = {}
        switch (resolved) {
            case "true":
                condition = {...condition, statusResolved: {[Op.is]: true}}
                break
            case "false":
                condition = {...condition, statusResolved: {[Op.is]: false}}
                break
            default:
                break
        }

        let allAlerts = await Alert.findAll({where:condition,
            include: [
                {model: Question, required: false},
                {model: Answer, required: false},
            ],
            order: [
            ['createdAt', 'DESC'],
        ]})
        
        res.send(paginate(parseInt(limit), parseInt(page), allAlerts))

    } catch (error) {
        next(error)
    }

}

module.exports = {
    getAllAlerts
}