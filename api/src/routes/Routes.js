const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const  ctrl = require("./Controllers.js")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/CreateUser/:sub",ctrl.PostUser)

router.get("/getuser/:email",ctrl.LogIn)

router.get("/AllQuestions",ctrl.AllQuestions)

router.get("/MyQuestions",ctrl.AllQuestions)

router.post("/createQuestion/:sub",ctrl.PostQuestion)

//router.get("/myQuestions:id",ctrl.PostQuestion)


module.exports = router;
