const { User, Answer, SubAnswer } = require("../db.js")

const postSubAnswer = async (req, res, next) => {
    const { id, text, sub } = req.body

    try {

        const answer = await Answer.findByPk(id)
        const user = await User.findByPk(sub)

        const newSubAnswer = await SubAnswer.create({text})

        await answer.update({ cantSubAnswers: answer.cantSubAnswers + 1 })
        await newSubAnswer.setAnswer(answer)
        await newSubAnswer.setUser(user)

        // Notifications
        const userReceiver = await answer.getUser()
        const question = await answer.getQuestion()
        let textNotif = `${user.name} comentó tu respuesta!`
        await userReceiver.createNotification({ text: textNotif, subCreator: sub, imgCreator: user.picture, questId: question.id })

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