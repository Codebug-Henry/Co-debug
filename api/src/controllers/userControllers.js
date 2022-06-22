const { User } = require('../db')

const getUserInfo = (req, res, next) => {
    const sub = req.params.sub
    return User.findByPk(sub)
        .then(result => res.send(result))
        .catch((error) => res.send(error))
}

const postUser = async (req, res, next) => {
    try {
        let user = await User.findByPk(req.body.sub)
        if(!user) user = await User.create(req.body)
        res.send(user)
    } catch (error) {
        res.send(error)
    }
}

// const postUser=async (req,res,next)=>{
//     const newUser = req.body
//     const sub = req.parmas.sub

//     let user_finded=await User.findByPk(sub)

//     if(user_finded)res.send(user_finded)

//     User.create(newUser)
//     .then(Created=>{
//         res.send(Created)
//     })
//     .catch(e=>next(e))
// }


const putUserInfo = (req, res, next) => {

}


const deleteUser = (req, res, next) => {

}

module.exports = {
    getUserInfo,
    postUser,
    putUserInfo,
    deleteUser
}