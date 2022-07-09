const { User, Question, Answer, MacroTag, MicroTag } = require("../db");
const { paginate } = require("./generalControllers");

const getAnswers = async (req, res, next) => {

  const {sub} = req.params

  const {page, limit} = req.query

  try {
    const myAnswers = await Answer.findAll({
      where: {statusDeleted: false, userSub: sub}, 
      order: [['createdAt', 'DESC']],
      include: [
        {model: Question,
        include: [
          {model: User},
          // {model: MacroTag},
          // {model: MicroTag}
        ]},
      ]
    })
    
    res.send(paginate(parseInt(limit), parseInt(page),myAnswers))

  } catch (error) {
    next(error)
  }
}


module.exports={
  getAnswers
}
