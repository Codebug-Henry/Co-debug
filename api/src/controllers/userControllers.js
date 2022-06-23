const { User } = require('../db')

const getUserInfo = (req, res, next) => {
    const sub = req.params.sub
    return User.findByPk(sub)
        .then(result => res.send(result))
        .catch((error) => next(error))
}

const postUser = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.body.sub)
        if(!user) user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        next(error)
    }
}

const putUserInfo = async (req, res, next) => {
    const {sub} = req.params
    const {name,nickname,picture,myTeachPoints} = req.body

    try {
        await User.update({name,nickname,picture,myTeachPoints},{
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


const deleteUser = async (req,res,next)=>{
    const {sub} = req.params

    try {
        await User.destroy({
            where:{
                sub:(sub)
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