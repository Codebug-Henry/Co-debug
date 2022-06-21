const getUserInfo=(req,res,next)=>{
   
}

const postUser=(req,res,next)=>{
   
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


const putUserInfo=(req,res,next)=>{
   
}


const deleteUser=(req,res,next)=>{
   
}

module.exports={
    getUserInfo,
    postUser,
    putUserInfo,
    deleteUser
}