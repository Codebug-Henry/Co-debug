const {User,Question}=require("../db.js")

const PostUser=async (req,res,next)=>{
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

const LogIn=async (req,res,next)=>{
    const email = req.params.email

    try {
        let finded= await User.findOne({
            where:{
                email:email
            },
            // includes:{
            //     model:Question
            //     at
            // }
        })
        if(!finded) next(new Error(message="no esta ese usuario"))

        // let Questions=await finded.getQuestions()

        res.send({...finded.dataValues})

    } catch (error) {
        next(error)
    }
    
}

const AllQuestions=async(req,res,next)=>{
    const sub=req.query.sub

    try {
        let questions=sub? await Question.findAll({where:{UserSub:sub}})
                         : await Question.findAll()    

        res.send(questions)
    } catch (e) {
        (e=>next(e)) 
    }
}

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
    PostUser,
    LogIn,
    AllQuestions,
    PostQuestion
}

