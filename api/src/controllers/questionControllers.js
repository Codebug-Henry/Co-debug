const deleteUserQuestion=(req,res,next)=>{
   
}

const putUserQuestion=(req,res,next)=>{
   
}

const postQuestion=(req,res,next)=>{
   
}

// const PostQuestion=(req,res,next)=>{
//     const sub = req.params.sub
//     const newQuestion = req.body

//     User.findByPk(sub)
//     .then(User_finded=>
//         Question.create(newQuestion)
//         .then(Q_Created=>{
//             Q_Created.setUser(User_finded)
//             User_finded.addQuestion(Q_Created)
//             .then(()=>res.send(Q_Created))
//             }
//         )
//     ).catch(e=>next(e))
// }

const getSingleQuestion=(req,res,next)=>{

}

module.exports={
    deleteUserQuestion,
    putUserQuestion,
    postQuestion,
    getSingleQuestion
}