const { User, Question,MacroTag,MicroTag } = require("../db");
const { Op } = require('sequelize');
const { paginate } = require("./generalControllers");

const getUserQuestions = async (req, res, next) => {

    const {sub} = req.params
    const {search, answered, page, limit} = req.query

    try {

        let condition = {
            userSub: sub,
            statusDeleted: false
        }

        if (search) {
            let searchArr = search.split(" ")
            searchArr.forEach((word, i, arr) => {
                arr[i] = word ? `%${word}%` : ""
            })
            condition = {
                ...condition,
                [Op.or]:
                    [
                        {title: {[Op.iLike]: {[Op.any]: searchArr}}},
                        {text: {[Op.iLike]: {[Op.any]: searchArr}}}
                    ]
            }
        }

        switch (answered) {
            case "true":
                condition = {...condition, cantAnswers: {[Op.gt]: 0}}
                break
            case "false":
                condition = {...condition, cantAnswers: 0}
                break
            default:
                break
        }
        
        let myQuestions = await Question.findAll({where: condition,
            order: [
            ['createdAt', 'DESC'],
            ['title', 'ASC'],
            ],
            include:[
                {model:MacroTag},
                {model:MicroTag}
            ]
        })
        
        res.send(paginate(parseInt(limit), parseInt(page), myQuestions))

    } catch (error) {
        next(error)
    }
    
}

const getAllQuestions = async (req, res, next) => {

    let {search, sort, page, limit, macroTag, microTag, validated} = req.query

    try {
        
        let condition = {statusDeleted: false}

        if (search) {
            let searchArr = search.split(" ")
            searchArr.forEach((word, i, arr) => {
                arr[i] = word ? `%${word}%` : ""
            })
            console.log(searchArr)
            condition = {
                ...condition,
                [Op.or]:
                    [
                        {title: {[Op.iLike]: {[Op.any]: searchArr}}},
                        {text: {[Op.iLike]: {[Op.any]: searchArr}}}
                    ]
            }
        }
        switch (validated) {
            case "true":
                condition = {...condition, statusValidated: true}
                break
            case "false":
                condition = {...condition, statusValidated: false}
                break
            default:
                break
        }
      
        let allQuestions = await Question.findAll({where: condition,
            order: [
            ['createdAt', sort || 'DESC'],
            ['title', sort || 'DESC'],
            ],
            include:[
                {
                    model:User,
                },
                {
                    model:MacroTag,
                },
                {
                    model:MicroTag,
                }
            ]
        })

        if(macroTag){
            allQuestions=allQuestions.filter(q=>
                q.macroTags.filter(maTag=>maTag.tag===macroTag).length>0
            )
        }
        if(microTag){
            allQuestions=allQuestions.filter(q=>
                q.microTags.filter(miTag=>miTag.tag===microTag).length>0
            )
        }
      
        res.send(paginate(parseInt(limit), parseInt(page), allQuestions))

    } catch (error) {
        next(error)
    }
}

const getFavourites = async (req, res, next) => {

    const {sub} = req.params

    const {limit, page} = req.query

    try {

        const user = await User.findByPk(sub)

        const favourites = await Question.findAll({where: {statusDeleted: false, id: {[Op.in]: user.favourites}},
            include:[
                {model:User},
                {model:MacroTag},
                {model:MicroTag}
            ]
        })
        
        res.send(paginate(parseInt(limit), parseInt(page), favourites))

    } catch (error) {
        next(error)
    }

}

const putFavourites = async (req, res, next) => {
    
    const {sub, id, add} = req.query

    try {

        const user = await User.findByPk(sub)
        
        if (add === "true") {

            const newFavourites = [...user.favourites, id]

            await user.update({
                favourites: newFavourites,
                cantFav: user.cantFav + 1
            })

            res.send("Question added to favourites")

        } else {

            const filteredFavourites = user.favourites.filter(e => e !== parseInt(id))
            
            await user.update({
                favourites: filteredFavourites,
                cantFav: user.cantFav - 1
            })

            res.send("Question removed from favourites")

        }
        
    } catch (error) {
        next(error)
    }

}

module.exports={
    getAllQuestions,
    getUserQuestions,
    putFavourites,
    getFavourites
}