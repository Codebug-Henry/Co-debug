const { User, SubAnswer } = require("../db");

const getSubAnswers = async (req, res, next) => {

    const {id} = req.params

    try {

        const subAnswers = await SubAnswer.findAll({
            where: {answerId: id, statusDeleted: false},
            order: [['createdAt', 'ASC']],
            include: User
        })

        res.send(subAnswers)
        
    } catch (error) {
        next(error)
    }

}

module.exports = {
    getSubAnswers
}