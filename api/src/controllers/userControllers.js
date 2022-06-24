const { User } = require('../db')
const { sortByPointsDesc } = require('./generalControllers')

const getUserInfo = (req, res, next) => {
    const sub = req.params.sub
    return User.findByPk(sub)
        .then(result => res.send(result))
        .catch((error) => next(error))
}

const getUserPosition = async (req, res, next) => {
    try {
        const sub = req.params.sub

        const allUsers = await User.findAll()

        allUsers.sort(sortByPointsDesc)

        let allSub = allUsers.map(e => e.sub)

        let myPosition = allSub.indexOf(sub)

        res.send({myPosition : myPosition + 1})
    } catch (error) {
        next(error)
    }
}

const postUser = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.body.sub)
        if (!user) user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        next(error)
    }
}

const putUserInfo = async (req, res, next) => {
    const {sub} = req.params
    let {name,nickname,picture,myTeachPoints,nameChanges} = req.body

    try {
        nameChanges=nameChanges+1
        await User.update({name,nickname,picture,myTeachPoints,nameChanges},{
            where:{
                sub:(sub)
            }
        })
        let userUpdated=await User.findByPk(sub)

        res.send({userUpdated})
    } catch (error) {
        next(error)
    }
}


const deleteUser = async (req, res, next) => {
    const { sub } = req.params

    try {
        await User.destroy({
            where: {
                sub: (sub)
            }
        })
        res.send("el usuario a sido eliminado correctamente")
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUserInfo,
    getUserPosition,
    postUser,
    putUserInfo,
    deleteUser
}