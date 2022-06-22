const { Question } = require("../db");
const { Op } = require('sequelize');
const { sortQuestionsAsc, sortQuestionsDesc } = require("./generalControllers");

const getAllQuestions= async (req,res,next) => {

    const {search, sort} = req.query

    try {

        let condition = search
        ? {[Op.or]: [{ title: {[Op.iLike]: `%${search}%`} }, { text: {[Op.iLike]: `%${search}%`} }]}
        : {}
        
        let allQuestions = await Question.findAll({where: condition})
        
        if (sort === "ascendent") allQuestions.sort(sortQuestionsAsc)
        else if (sort === "descendent") allQuestions.sort(sortQuestionsDesc)

        res.send(allQuestions)

    } catch (error) {
        next(error)
    }

}

const getUserQuestions= async (req,res,next) => {

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

const putFavourites=(req,res,next)=>{
    // /questions/favourites?subUser=" "&idQuestion=" "&add=boolean 
}

const getFavourites=(req,res,next)=>{
   
}

module.exports={
    getAllQuestions,
    getUserQuestions,
    putFavourites,
    getFavourites
}