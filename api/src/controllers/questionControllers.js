const {User, Question, Answer, MacroTag, MicroTag} = require("../db.js")
const { questionTags } = require("./generalControllers.js")

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
    let {id, text, title, like, statusDeleted,imgs,newMacroTags,newMicroTags} = req.body

    const question = await Question.findByPk(id)
    let newLikes = question.likes

    if (like === "add") newLikes++
    else if (like === "remove") newLikes--

    try {
        newMacroTags=await MacroTag.findAll({where:{id:newMacroTags}})
        newMicroTags=await MicroTag.findAll({where:{id:newMicroTags}})
        
        let oldMacroTags=await question.getMacroTags()
        let oldMicroTags=await question.getMicroTags()

        await question.removeMacroTags(oldMacroTags)
        await question.removeMicroTags(oldMicroTags)

        newMacroTags=await questionTags(newMacroTags, MacroTag, question)
        newMicroTags=await questionTags(newMicroTags, MicroTag, question)

        await Question.update({text, title, likes: newLikes, statusDeleted,imgs},{
            where:{
                id:parseInt(id)
            }
        })

        res.send({
            newMacroTags,
            newMicroTags,
            text,
            title,
            likes: newLikes,
            imgs,
            statusDeleted
        })
    } catch (error) {
        next(error)
    }
}

const postQuestion = async (req, res, next) => {
   let {sub, text, title,imgs,macroTags,microTags} = req.body
    
    try {
        const user = await User.findByPk(sub)
        await user.update({cantQuest: user.cantQuest + 1})
        const newQuestion = await Question.create({text, title,imgs})
        // console.group(macrotag)
        macroTags=await questionTags(macroTags, MacroTag, newQuestion)
        microTags=await questionTags(microTags, MicroTag, newQuestion)

        newQuestion.setUser(user)
        res.send({user, ...newQuestion.dataValues, macroTags, microTags})

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
                {model: Answer, include: User},
                {model: MacroTag},
                {model: MicroTag}
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