const { User, Question } = require("../db");
const { Op } = require('sequelize');
const { sortByPointsAsc, sortByPointsDesc } = require("./generalControllers");

const getUserQuestions = async (req, res, next) => {

    const {sub} = req.params
    const {answered} = req.query

    try {

        let condition = {userSub: sub}

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
        
        let myQuestions = await Question.findAll({where: condition})
        
        res.send(myQuestions)

    } catch (error) {
        next(error)
    }
    
}

const getAllQuestions = async (req, res, next) => {

    const {search, sort} = req.query

    try {

        let condition = search
        ? {[Op.or]: [{ title: {[Op.iLike]: `%${search}%`} }, { text: {[Op.iLike]: `%${search}%`} }]}
        : {}
        
        let allQuestions = await Question.findAll({where: condition, include:User})
        
        if (sort === "ascendent") allQuestions.sort(sortByPointsAsc)
        else if (sort === "descendent") allQuestions.sort(sortByPointsDesc)

        res.send(allQuestions)

    } catch (error) {
        next(error)
    }

}

const getFavourites = async (req, res, next) => {

    const {sub} = req.params

    try {

        const user = await User.findByPk(sub)

        const favourites = await Question.findAll({where: {id: {[Op.in]: user.favourites}}})
        
        res.send(favourites)

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

            await user.update({favourites: newFavourites})

            res.send("Question added to favourites")

        } else {

            const filteredFavourites = user.favourites.filter(e => e !== parseInt(id))
            console.log(filteredFavourites)
            await user.update({favourites: filteredFavourites})

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