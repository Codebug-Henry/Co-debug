const { Question, Answer } = require("../db.js")

const postAlertQuestion = async (req, res, next) => {
   const {id, message, subCreator} = req.body
    
    try {
        const question = await Question.findByPk(id)
        const newAlert = await question.createAlert({message, subCreator})
        res.send({...newAlert.dataValues, question})

   } catch (error) {
        next(error)
   }
}

const postAlertAnswer = async (req, res, next) => {
    const {id, message, subCreator} = req.body
     
     try {
         const answer = await Answer.findByPk(id)
         const newAlert = await answer.createAlert({message, subCreator})
         res.send({...newAlert.dataValues, answer})
 
    } catch (error) {
         next(error)
    }
 }

module.exports = {
    postAlertQuestion,
    postAlertAnswer
}