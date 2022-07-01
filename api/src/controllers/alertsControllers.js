const { Question, Answer, Alert } = require("../db");
const { paginate } = require("./generalControllers");

const getAllAlerts = async (req, res, next) => {

    const {page, limit, resolved} = req.query

    try {
        let condition = {}
        switch (resolved) {
            case "true":
                condition = {...condition, statusResolved: true}
                break
            case "false":
                condition = {...condition, statusResolved: false}
                break
            default:
                break
        }

        let allAlerts = await Alert.findAll({
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