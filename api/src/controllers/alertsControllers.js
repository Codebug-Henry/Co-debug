const { Question, Answer, Alert } = require("../db");
const { paginate } = require("./generalControllers");

const getAllAlerts = async (req, res, next) => {

    const {page, limit} = req.query

    try {

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