const { User } = require('../db')
const { getUserPosition } = require('./generalControllers')

const getUserInfo = async (req, res, next) => {
    const sub = req.params.sub
    try {
        const myPosition = await getUserPosition(sub)
        const user = await User.findByPk(sub)
        res.send({...user.dataValues, myPosition})
    } catch (error) {
        next(error)
    }
}

const postUser = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.body.sub)
        if (!user) user = await User.create(req.body)
        const myPosition = await getUserPosition(user.sub)
        res.send({...user.dataValues, myPosition})
    } catch (error) {
        next(error)
    }
}

const putUserInfo = async (req, res, next) => {
    const {sub} = req.params
    let {name, nickname, picture, myTeachPoints, nameChanges} = req.body

    try {
        nameChanges = nameChanges + 1
        await User.update({name, nickname, picture, myTeachPoints, nameChanges}, {
            where:{
                sub:(sub)
            }
        })
        let userUpdated = await User.findByPk(sub)

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
    postUser,
    putUserInfo,
    deleteUser
}