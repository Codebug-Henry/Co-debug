const { User, Answer, SubAnswer } = require("../db.js")

const postSubAnswer = async (req, res, next) => {
    const { id, text, sub } = req.body

    try {

        const answer = await Answer.findByPk(id)
        const user = await User.findByPk(sub)

        // Notifications
        const userAnswer = await answer.getUser()
        const question = await answer.getQuestion()
        if (sub !== userAnswer.sub) {
            let textNotif = `${user.name} comentó tu respuesta!`
            await userAnswer.createNotification({ text: textNotif, subCreator: sub, imgCreator: user.picture, questId: question.id })
        }
        const subAnswers = await answer.getSubAnswers()
        const usersSet = new Set()
        let arrPromises = subAnswers?.map((subAns) => {
            if (subAns.userSub !== sub && subAns.userSub !== userAnswer.sub && !usersSet.has(subAns.userSub)) {
                usersSet.add(subAns.userSub)
                subAns.getUser()
                .then(userSubAns => {
                    let textNotif = `${user.name} también comentó en el hilo de comentarios que participas`
                    userSubAns.createNotification({ text: textNotif, subCreator: sub, imgCreator: user.picture, questId: question.id })
                })
            }
          });
        await Promise.all(arrPromises);

        const newSubAnswer = await SubAnswer.create({text})

        await answer.update({ cantSubAnswers: answer.cantSubAnswers + 1 })
        await newSubAnswer.setAnswer(answer)
        await newSubAnswer.setUser(user)

        res.send(newSubAnswer)
    } catch (error) {
        next(error)
    }
}

const putSubAnswer = async (req, res, next) => {
    const {id, text, statusDeleted} = req.body
     
     try {
        const subAnswer = await SubAnswer.findByPk(id)
        const answer = await subAnswer.getAnswer()

        await subAnswer.update({text, statusDeleted})

        if (statusDeleted) {
            await answer.update({cantSubAnswers: answer.cantSubAnswers - 1})
        }

        res.send(subAnswer)
 
    } catch (error) {
         next(error)
    }
 }

module.exports = {
    postSubAnswer,
    putSubAnswer,
}