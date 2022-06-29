const { User } = require('../db');
const { paginate } = require('./generalControllers');

const getTopTen = async (req, res, next)=>{
    try {

        const topTen = await User.findAll({
            where:{
                statusDeleted: false,
                statusBanned: false
            },
            order: [
                ['myTeachPoints', 'DESC'],
                ['cantAns', 'DESC'],
                ['cantQuest', 'DESC'],
            ],
            limit: 10
        })
        
        topTen.forEach((e, i) => e.dataValues.myPosition = i + 1)

        res.send (topTen)

    } catch (error) {
        next(error)
    }
}

const getRanking = async (req, res, next) =>{
    
    const {sort, page, limit, admin} = req.query
    
    try {
        let condition = {
            statusDeleted: false,
            statusBanned: false
        }
        if(admin === "true"){
            condition = {}
        }
        const allUsers = await User.findAll({
            where:condition,
            order: [
            ['myTeachPoints', sort || 'DESC'],
            ['cantAns', sort || 'DESC'],
            ['cantQuest', sort || 'DESC'],
        ]})

        allUsers.forEach((e, i) => e.dataValues.myPosition = i + 1)

        res.send (paginate(parseInt(limit), parseInt(page), allUsers))

    } catch (error) {
        next(error)
    }
 }

module.exports={
    getTopTen,
    getRanking
}