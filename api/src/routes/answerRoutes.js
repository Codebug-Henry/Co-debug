const { Router } = require('express');

const { postAnswer,putAnswer,deleteAnswer } = require("../controllers/answerControllers")

const router = Router();

router.post("/", postAnswer)

router.put("/", putAnswer)

router.delete("/:id", deleteAnswer)

module.exports = router