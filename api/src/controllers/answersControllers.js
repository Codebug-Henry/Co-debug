const { Question, Answer,MacroTag, MicroTag } = require("../db");
const { paginate } = require("./generalControllers");

const getAnswers = async (req, res, next) => {

  const {sub} = req.params

  const {page, limit} = req.query

  try {
      
    const myAnswers = await Answer.findAll({where: {userSub: sub}, 
      include:[
        {model:Question,
        include:[
          {model:MacroTag},
          {model:MicroTag}
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
