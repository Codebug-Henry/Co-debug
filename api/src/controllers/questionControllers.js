const {User, Question} = require("../db.js")

const deleteUserQuestion = async (req, res, next) => {
    const {id} = req.params

    try {
        await Question.destroy({
            where:{
                id
            }
        })
        res.send("borrado correctamente")        
    } catch (error) {
        next(error)
    }
}

const putUserQuestion = async (req, res, next) => {
    const {id, text, title, like} = req.body

    const question = await Question.findByPk(id)
    let newLikes = question.likes

    if (like === "add") newLikes++
    else if (like === "remove") newLikes--

    try {
        await Question.update({text, title, likes: newLikes},{
            where:{
                id:parseInt(id)
            }
        })
        // await Question.findByPk(id)

        res.send({
            text,
            title,
            likes: newLikes
        })
    } catch (error) {
        next(error)
    }
}


const postQuestion = async (req, res, next) => {
   const {sub, text, title} = req.body
    
    try {
        const user = await User.findByPk(sub)
        const newQuestion = await Question.create({text, title})
        newQuestion.setUser(user)
        res.send(newQuestion)

   } catch (error) {
        next(error)
   }
}

const getSingleQuestion = async (req, res, next) => {
    const id = req.params.id

    try {
        let questionFound = await Question.findByPk(id)
        let user=await questionFound.getUser()
        let answers=await questionFound.getAnswers()

        res.send(
            {
                user:{
                    name:user.name,
                },
                ...questionFound.dataValues,
                answers
            }
        )

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