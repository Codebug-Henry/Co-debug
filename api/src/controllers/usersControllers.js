const { User } = require('../db');
const { paginate } = require('./generalControllers');

const getTopTen = async (req, res, next)=>{
    try {

        const allUsers = await User.findAll({
            order: [
            ['myTeachPoints', 'DESC'],
            ['cantAns', 'DESC'],
            ['cantQuest', 'DESC'],
        ]})
    
        res.send (allUsers.slice(0, 10))

    } catch (error) {
        next(error)
    }
}

const getRanking = async (req, res, next) =>{
    
    const {sort, page, limit} = req.query
    
    try {

        const allUsers = await User.findAll({
            order: [
            ['myTeachPoints', sort || 'DESC'],
            ['cantAns', sort || 'DESC'],
            ['cantQuest', sort || 'DESC'],
        ]})
        
        res.send (paginate(parseInt(limit), parseInt(page), allUsers))

    } catch (error) {
        next(error)
    }
 }

module.exports={
    getTopTen,
    getRanking
}