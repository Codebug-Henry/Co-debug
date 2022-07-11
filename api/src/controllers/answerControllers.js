const {Answer, Question, User, Notification} = require("../db")

const postAnswer = async (req, res, next) => {

   const {sub, id, text} = req.body

   try {
      const question = await Question.findByPk(id)
      const user = await User.findByPk(sub)
      const newAnswer = await Answer.create({
         text,
         teachPoints: question.teachPoints
      })

      await user.update({cantAns: user.cantAns + 1})
      await question.update({cantAnswers: question.cantAnswers + 1})
      await newAnswer.setQuestion(question)
      await newAnswer.setUser(user)

      // Notifications
      const userReceiver = await question.getUser()
      if (sub !== userReceiver.sub) {
         let textNotif = `${user.name} respondió tu pregunta!`
         await userReceiver.createNotification({text: textNotif, subCreator: sub, imgCreator: user.picture, questId: id})
      }

      res.send(newAnswer)
   } catch (error) {
      next(error)
   }
}

const putAnswer = async (req, res, next) => {

   const {id, text, like, statusDeleted, statusValidated, sub} = req.body

   try {
      const answer = await Answer.findByPk(id)
      const question = await answer.getQuestion()
      const user = await answer.getUser()
      const userLogged = await User.findByPk(sub)

      let newLikes = answer.likes

      if (like === "add") {
         let likedSet = new Set(userLogged.ansLiked)
         let dislikedSet = new Set(userLogged.ansDisliked)
 
         if (dislikedSet.has(id)) {
            dislikedSet.delete(id)
            await userLogged.update({ansDisliked: [...dislikedSet]})
            newLikes++
         }
         else if (!likedSet.has(id)) {
            likedSet.add(id)
            await userLogged.update({ansLiked: [...likedSet]})
            newLikes++
         }
     }
     else if (like === "remove"){
         let likedSet = new Set(userLogged.ansLiked)
         let dislikedSet = new Set(userLogged.ansDisliked)
         
         if (likedSet.has(id)) {
            likedSet.delete(id)
            await userLogged.update({ansLiked: [...likedSet]})
            newLikes--
         }
         else if (!dislikedSet.has(id)) {
            dislikedSet.add(id)
            await userLogged.update({ansDisliked: [...dislikedSet]})
            newLikes--
         }
     } 
 
      await answer.update({text, likes: newLikes, statusDeleted, statusValidated})
      
      if (statusValidated) {
         await question.update({statusValidated, teachPoints: answer.teachPoints})
         await user.update({myTeachPoints: user.myTeachPoints + answer.teachPoints})
         // Notifications
         let textNotif = `${userLogged.name} validó tu respuesta! Sumas ${answer.teachPoints} Teach Points a tu cuenta personal!`
         await user.createNotification({text: textNotif, subCreator: sub, imgCreator: userLogged.picture, questId: question.id})
      }

      if (statusDeleted) {
         await user.update({cantAns: user.cantAns - 1})
         await question.update({cantAnswers: question.cantAnswers - 1})
         if (answer.statusValidated) {
            await question.update({statusValidated: false})
            await user.update({myTeachPoints: user.myTeachPoints - answer.teachPoints})
            }
     }

      res.send({
         text,
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

      await question.update({cantAnswers: question.cantAnswers - 1})

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