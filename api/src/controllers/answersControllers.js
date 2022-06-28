const { Question, Answer } = require("../db");
const { paginate } = require("./generalControllers");

const getAnswers = async (req, res, next) => {

  const {sub} = req.params

  const {page, limit} = req.query

  try {
      
    const myAnswers = await Answer.findAll({where: {statusDeleted: false, userSub: sub}, include: Question})
      
    res.send(paginate(parseInt(limit), parseInt(page),myAnswers))

  } catch (error) {
    next(error)
  }

}


module.exports={
  getAnswers
}
