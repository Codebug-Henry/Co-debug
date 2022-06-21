const { Router } = require('express');

const {postQuestion,putUserQuestion,getSingleQuestion,deleteUserQuestion} = require("../controllers/questionControllers")

const router = Router();

router.post("/question",postQuestion)

router.put("/question",putUserQuestion)

router.get("/question/:id",getSingleQuestion)

router.delete("/question/:id",deleteUserQuestion)


module.exports = router