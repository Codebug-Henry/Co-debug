const { User } = require('../db');
const { paginate } = require('./generalControllers');
const { Op } = require('sequelize');

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
                ['name', 'DESC'],
            ],
            limit: 10
        })
        
        topTen.forEach((e, i) => e.dataValues.myPosition = i + 1)

        res.send (topTen)

    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next) =>{
    
    const {sort, page, limit, admin, all, search} = req.query
    
    try {
        let condition = all === "true" ? {} : {
            statusDeleted: false,
            statusBanned: false
        }

        if (admin === "true") {
            condition = {
                ...condition,
                statusAdmin: true
            }
        }

        if (admin === "false") {
            condition = {
                ...condition,
                statusAdmin: false
            }
        }

        if (search) {
            condition = {
                ...condition,
                email: {[Op.iLike]: `%${search}%`}
            }
        }

        let sortCondition = [['myTeachPoints', 'DESC'], ['cantAns', 'DESC'], ['cantQuest', 'DESC'], ['name', 'DESC']]
        
        let [sortType, sortDir] = sort.split("-")

        switch (sortType) {
            case "points":
                sortCondition = [['myTeachPoints', sortDir], ['cantAns', sortDir], ['cantQuest', sortDir], ['name', sortDir]]
                break
            case "quest":
                sortCondition = [['cantQuest', sortDir], ['myTeachPoints', sortDir], ['cantAns', sortDir], ['name', sortDir]]
                break
            case "answ":
                sortCondition = [['cantAns', sortDir], ['myTeachPoints', sortDir], ['cantQuest', sortDir], ['name', sortDir]]
                break
            default:
                break
        }

        const allUsers = await User.findAll({
            where: condition,
            order: sortCondition
        })

        const length = allUsers.length
        
        allUsers.forEach((e, i) => e.dataValues.myPosition = sortDir === "asc" ? length - i : i + 1)

        res.send (paginate(parseInt(limit), parseInt(page), allUsers))

    } catch (error) {
        next(error)
    }
 }

module.exports={
    getTopTen,
    getUsers
}