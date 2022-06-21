const {User,Question}=require("../db.js")

const postUser=async (req,res,next)=>{
    const newUser = req.body
    const sub = req.parmas.sub

    let user_finded=await User.findByPk(sub)

    if(user_finded)res.send(user_finded)

    User.create(newUser)
    .then(Created=>{
        res.send(Created)
    })
    .catch(e=>next(e))
}

const getTopTen= (req,res,next)=>{
    
}

const getAllQuestions=(req,res,next)=>{
    const {search,sort}=req.query

    // if(search) //filtra por search
    // else if( sort) //amoda por siort
    // else finall

}

const getUserQuestions=(req,res,next)=>{
    // por query answered=boolean
    //if(answered===undefined) todo
    // else uno u otro
}


const getSingleQuestion=(req,res,next)=>{

}


const postAnswer=(req,res,next)=>{
    //user.findbypk=usuario que respondio=>usuario.addAnswer(respuesta crada)/user.findbypk=question=>Question.addAnswer(respuesta crada)
    //llega por body respuesta, id de pregunta y id de usuario=>añade respuesta a usuario, pregunta, cdrea respuesta
}

const putFavourites=(req,res,next)=>{
    // /questions/favourites?subUser=" "&idQuestion=" "&add=boolean 
}

const getFavourites=(req,res,next)=>{
   
}

const deleteUserQuestion=(req,res,next)=>{
   
}

const putUserQuestion=(req,res,next)=>{
   
}

const getRanking=(req,res,next)=>{
   //  /users?sort=ascendent/descendent
}

const postQuestion=(req,res,next)=>{
   
}

const getUserInfo=(req,res,next)=>{
   
}

const putUserInfo=(req,res,next)=>{
   
}

const deleteUser=(req,res,next)=>{
   
}

const putAnswer=(req,res,next)=>{
   
}

const deleteAnswer=(req,res,next)=>{
   
}

const getAnswers=(req,res,next)=>{
   
}

// const allQuestions=async(req,res,next)=>{
//     const sub=req.query.sub

//     try {
//         let questions=sub? await Question.findAll({where:{UserSub:sub}})
//                          : await Question.findAll()    

//         res.send(questions)
//     } catch (e) {
//         (e=>next(e)) 
//     }
// }

const PostQuestion=(req,res,next)=>{
    const sub = req.params.sub
    const newQuestion = req.body

    User.findByPk(sub)
    .then(User_finded=>
        Question.create(newQuestion)
        .then(Q_Created=>{
            Q_Created.setUser(User_finded)
            User_finded.addQuestion(Q_Created)
            .then(()=>res.send(Q_Created))
            }
        )
    ).catch(e=>next(e))
}

module.exports={
    postUser,
    getTopTen,
    getAllQuestions,
    getUserQuestions,
    getSingleQuestion,
    PostQuestion,
    postAnswer,
    putFavourites,
    getFavourites,
    putUserQuestion,
    deleteUserQuestion,
    getRanking,
    postQuestion,
    getUserInfo,
    putUserInfo,
    deleteUser,
    getAnswers,
    deleteAnswer,
    putAnswer
}



// LogIn,
    // const LogIn=async (req,res,next)=>{
    //     const email = req.params.email
    
    //     try {
    //         let finded= await User.findOne({
    //             where:{
    //                 email:email
    //             },
    //             // includes:{
    //             //     model:Question
    //             //     at
    //             // }
    //         })
    //         if(!finded) next(new Error(message="no esta ese usuario"))
    
    //         // let Questions=await finded.getQuestions()
    
    //         res.send({...finded.dataValues})
    
    //     } catch (error) {
    //         next(error)
    //     }
        
    // }
