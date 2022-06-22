const { Question, Answer } = require("../db");

const getAnswers = async (req, res, next) => {

  const {sub} = req.params

  try {
      
    const myAnswers = await Answer.findAll({where: {userSub: sub}, include: Question})
      
    res.send(myAnswers)

  } catch (error) {
    next(error)
  }

}


module.exports={
  getAnswers
}
