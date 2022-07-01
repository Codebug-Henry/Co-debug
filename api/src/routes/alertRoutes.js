const { Router } = require('express');

const { postAlertQuestion, postAlertAnswer, putAlert } = require("../controllers/alertControllers")

const router = Router();

router.post("/question", postAlertQuestion)

router.post("/answer", postAlertAnswer)

router.put("/", putAlert)


module.exports = router