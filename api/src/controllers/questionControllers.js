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
    const user = await question.getUser()
    const answers = await question.getAnswers()
    
    // const newFavourites = [...user.favourites, id]
    
    //         await user.update({
        //             favourites: newFavourites,
        //             cantFav: user.cantFav + 1
        //         })
    
        let newLikes = question.likes
        
    if (like === "add") {
        newLikes++
        if (user.disliked.includes(id)) {
            let userDisliked = user.disliked.filter(questId => questId !== id)
            await user.update({disliked: userDisliked})
        }
        else {
            let userLiked = [...user.liked, id]
            await user.update({liked: userLiked})
        }
    }
    else if (like === "remove"){
        newLikes--
        if (user.liked.includes(id)) {
            let userLiked = user.liked.filter(questId => questId !== id)
            await user.update({liked: userLiked})
        }
        else {
            let userDisliked = [...user.disliked, id]
            await user.update({disliked: userDisliked})
        }
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
        
        if (statusDeleted) {
            let promise = user.update({cantQuest: user.cantQuest - 1})
            let arrPromises1 = answers.map(ans => {
                ans.update({statusDeleted: true})
            })
            let arrPromises2 = answers.map(ans => {
                ans.getUser().then(userAns => userAns.update({cantAns: userAns.cantAns - 1}))
            })
            let arrPromises = [promise, ...arrPromises1, ...arrPromises2]
            await Promise.all(arrPromises)
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