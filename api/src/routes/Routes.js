const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  {putAnswer,deleteAnswer,getAnswers,postQuestion,postUser,getTopTen,getAllQuestions,getUserQuestions,getSingleQuestion,postAnswer,putFavourites,getFavourites,putUserQuestion,deleteUserQuestion,getRanking,getUserInfo,putUserInfo,deleteUser} = require("./Controllers.js")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/user",postUser)

router.get("/users/topTen",getTopTen)

router.get("/users",getRanking)

router.get("/user/:sub",getUserInfo)

router.put("/user/:sub",putUserInfo)

router.delete("/user/:sub",deleteUser)

//------------------------------------

router.post("/question",postQuestion)

router.put("/question",putUserQuestion)

router.get("/question/:id",getSingleQuestion)

router.delete("/question/:id",deleteUserQuestion)

router.put("/questions/favourites",putFavourites)

router.get("/questions/favourites/:sub",getFavourites)

router.get("/questions",getAllQuestions)

router.get("/questions/:sub",getUserQuestions)


//------------------------------------

router.post("/answer",postAnswer)

router.put("/answer",putAnswer)

router.delete("/answer/:id",deleteAnswer)

router.get("/answers/:sub",getAnswers)




module.exports = router;
