const { Router } = require('express');

const {postAnswer,putAnswer,deleteAnswer} = require("../controllers/answerControllers")

const router = Router();

router.post("/answer",postAnswer)

router.put("/answer",putAnswer)

router.delete("/answer/:id",deleteAnswer)

module.exports = router