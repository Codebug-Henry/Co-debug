const { Router } = require('express');

const { postSubAnswer, putSubAnswer } = require("../controllers/subAnswerControllers")

const router = Router();

router.post("/", postSubAnswer)

router.put("/", putSubAnswer)

module.exports = router