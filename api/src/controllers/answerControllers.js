const {Answer, Question, User} = require("../db")

const postAnswer = async (req, res, next) => {
    const {sub, id, text} = req.body

     try {
        const newAnswer = await Answer.create({text})
        const question= await Question.findByPk(id)
        const user= await User.findByPk(sub)
        
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
    const {id, text, like} = req.body

    const answer = await Answer.findByPk(id)
    let newLikes = answer.likes

    if (like === "add") newLikes++
    else if (like === "remove") newLikes--

    try {
       await Answer.update({text, likes: newLikes},{
        where:{
            id
        }
       })
       res.send({
        text,
        likes: newLikes
       })
    } catch (error) {
       next(error)
    }
}

const deleteAnswer  =async (req, res, next) => {
    const {id} = req.params

    try {
        await Answer.destroy({
            where:{
                id
            }
        })
       
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