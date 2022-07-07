const {Answer, Question, User} = require("../db")

const postAnswer = async (req, res, next) => {

   const {sub, id, text, imgs} = req.body

   try {
      const question = await Question.findByPk(id)
      const user = await User.findByPk(sub)
      const newAnswer = await Answer.create({
         text,
         imgs,
         teachPoints: question.teachPoints
      })

      await user.update({cantAns: user.cantAns + 1})
      await question.update({cantAnswers: question.cantAnswers + 1})
      await newAnswer.setQuestion(question)
      await newAnswer.setUser(user)

      res.send(newAnswer)
   } catch (error) {
      next(error)
   }
}

const putAnswer = async (req, res, next) => {

   const {id, text, like, statusDeleted, statusValidated, imgs, sub} = req.body

   try {
      const answer = await Answer.findByPk(id)
      const question = await answer.getQuestion()
      const user = await answer.getUser()
      const userLogged = await User.findByPk(sub)

      let newLikes = answer.likes

      if (like === "add") {
         newLikes++
         if (userLogged.ansDisliked.includes(id)) {
             let userLoggedDisliked = userLogged.ansDisliked.filter(questId => questId !== id)
             await userLogged.update({ansDisliked: userLoggedDisliked})
         }
         else {
             let userLoggedLiked = [...userLogged.ansLiked, id]
             await userLogged.update({ansLiked: userLoggedLiked})
         }
      }
      else if (like === "remove"){
         newLikes--
         if (userLogged.ansLiked.includes(id)) {
             let userLoggedLiked = userLogged.ansLiked.filter(questId => questId !== id)
             await userLogged.update({ansLiked: userLoggedLiked})
         }
         else {
             let userLoggedDisliked = [...userLogged.ansDisliked, id]
             await userLogged.update({ansDisliked: userLoggedDisliked})
         }
     } 

      await answer.update({text, imgs, likes: newLikes, statusDeleted, statusValidated})
      
      if (statusValidated) {
         await question.update({statusValidated})
         await user.update({myTeachPoints: user.myTeachPoints + answer.teachPoints})
      }

      if (statusDeleted) {
         await user.update({cantAns: user.cantAns - 1})
     }

      res.send({
         text,
         imgs,
         likes: newLikes,
         statusDeleted,
         statusValidated
      })
    } catch (error) {
      next(error)
    }
}

const deleteAnswer  =async (req, res, next) => {
   const {id} = req.params

   try {

      const answerDeleted = await Answer.findByPk(id)

      const userDeleter = await User.findByPk(answerDeleted.userSub)

      const question = await User.findByPk(answerDeleted.questionId)

      await userDeleter.update({cantAns: userDeleter.cantAns - 1})

      await question.update({cantAnswer: question.cantAnswer - 1})

      await answerDeleted.destroy()
      
      res.send("borrado correctamente")

   } catch (error) {
      next(error)
   }
}

module.exports={
    postAnswer,
    putAnswer,
    deleteAnswer,
}