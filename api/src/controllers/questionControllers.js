const {User, Question, Answer} = require("../db.js")

const deleteUserQuestion = async (req, res, next) => {
    const {id} = req.params
    
    try {
        const questionDeleted=await Question.findByPk(id)

        const userDeleter = await User.findByPk(questionDeleted.userSub)

        await userDeleter.update({cantQuest:userDeleter.cantQuest-1})

        await questionDeleted.destroy()
        
        res.send("borrado correctamente")        
    } catch (error) {
        next(error)
    }
}

const putUserQuestion = async (req, res, next) => {
    const {id, text, title, like, statusDeleted} = req.body

    const question = await Question.findByPk(id)
    let newLikes = question.likes

    if (like === "add") newLikes++
    else if (like === "remove") newLikes--

    try {
        await Question.update({text, title, likes: newLikes, statusDeleted},{
            where:{
                id:parseInt(id)
            }
        })
        // await Question.findByPk(id)

        res.send({
            text,
            title,
            likes: newLikes,
            statusDeleted
        })
    } catch (error) {
        next(error)
    }
}


const postQuestion = async (req, res, next) => {
   const {sub, text, title} = req.body
    
    try {
        const user = await User.findByPk(sub)
        await user.update({cantQuest: user.cantQuest + 1})
        const newQuestion = await Question.create({text, title})
        newQuestion.setUser(user)
        res.send({user, ...newQuestion.dataValues})

   } catch (error) {
        next(error)
   }
}

const getSingleQuestion = async (req, res, next) => {
    const id = req.params.id

    try {
        const question = await Question.findByPk(id, {
            include: [
                {model: User},
                {model: Answer, required: false, where: {statusDeleted: false}, include: User}
            ]
        })        

        res.send(question)

    } catch (error) {
        next(error)
    }
}

module.exports={
    deleteUserQuestion,
    putUserQuestion,
    postQuestion,
    getSingleQuestion
}