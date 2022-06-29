const {Answer, Question, User} = require("../db")

const postAnswer = async (req, res, next) => {
    const {sub, id, text,imgs} = req.body

     try {
        const newAnswer = await Answer.create({text,imgs})
        const question= await Question.findByPk(id)
        const user= await User.findByPk(sub)
        await user.update({cantAns:user.cantAns+1})
        await question.update({cantAnswers:question.cantAnswers+1})
        
        await newAnswer.setQuestion(question)
        await newAnswer.setUser(user)

        res.send(newAnswer)
     } catch (error) {
        next(error)
     }
}
//user.findbypk=usuario que respondio=>usuario.addAnswer(respuesta crada)/user.findbypk=question=>Question.addAnswer(respuesta crada)
//llega por body respuesta, id de pregunta y id de usuario=>añade respuesta a usuario, pregunta, cdrea respuesta

const putAnswer = async (req, res, next) => {
    const {id, text, like, statusDeleted,imgs} = req.body

    const answer = await Answer.findByPk(id)
    let newLikes = answer.likes

    if (like === "add") newLikes++
    else if (like === "remove") newLikes--

    try {
       await Answer.update({text, likes: newLikes, statusDeleted,imgs},{
        where:{
            id
        }
       })
       res.send({
        text,
        likes: newLikes,
        statusDeleted
       })
    } catch (error) {
       next(error)
    }
}

const deleteAnswer  =async (req, res, next) => {
    const {id} = req.params

    try {

        const answerDeleted=await Answer.findByPk(id)

        const userDeleter = await User.findByPk(answerDeleted.userSub)

        const question = await User.findByPk(answerDeleted.questionId)

        await userDeleter.update({cantAns:userDeleter.cantAns-1})

        await question.update({cantAnswer:question.cantAnswer-1})

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