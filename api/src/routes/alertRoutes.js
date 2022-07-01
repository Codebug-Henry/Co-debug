const { Router } = require('express');

const { postAlertQuestion, postAlertAnswer } = require("../controllers/alertControllers")

const router = Router();

router.post("/question", postAlertQuestion)

router.post("/answer", postAlertAnswer)

module.exports = router