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
    let {id, text, title, like, statusDeleted,imgs,macroTags,microTags,sub} = req.body

    const question = await Question.findByPk(id)

    let user = await User.findByPk(sub)
    
    let newLikes = question.likes
    
    // const newFavourites = [...user.favourites, id]

    //         await user.update({
    //             favourites: newFavourites,
    //             cantFav: user.cantFav + 1
    //         })

    if (like === "add") {
        newLikes++
        let userLiked = [...user.liked,id]
        await user.update({liked:userLiked})
    }
    else if (like === "remove"){
        newLikes-- 
        let userLiked = [...user.liked,id].filter(questId=>questId!==id)
        await user.update({liked:userLiked})
    } 

    try {
        if(macroTags){
            macroTags=await MacroTag.findAll({where:{id:macroTags}})
            let oldMacroTags=await question.getMacroTags()
            await question.removeMacroTags(oldMacroTags)
            macroTags=await questionTags(macroTags, MacroTag, question)
        }

        if(microTags){
            microTags=await MicroTag.findAll({where:{id:microTags}})
            let oldMicroTags=await question.getMicroTags()
            await question.removeMicroTags(oldMicroTags)
            microTags=await questionTags(microTags, MicroTag, question)
        }
        
        await Question.update({text, title, likes: newLikes, statusDeleted,imgs},{
            where:{
                id:parseInt(id)
            }
        })

        res.send({
            macroTags,
            microTags,
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
                {model: Answer, required: false, where: {statusDeleted: false}, include: User},
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