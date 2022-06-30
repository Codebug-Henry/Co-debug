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

        if (search) {
            condition = {
                ...condition,
                email: {[Op.iLike]: `%${search}%`}
            }
        }

        const allUsers = await User.findAll({
            where: condition,
            order: [
            ['myTeachPoints', sort || 'DESC'],
            ['cantAns', sort || 'DESC'],
            ['cantQuest', sort || 'DESC'],
        ]})

        const length = allUsers.length
        
        allUsers.forEach((e, i) => e.dataValues.myPosition = sort === "asc" ? length - i : i + 1)

        res.send (paginate(parseInt(limit), parseInt(page), allUsers))

    } catch (error) {
        next(error)
    }
 }

module.exports={
    getTopTen,
    getUsers
}