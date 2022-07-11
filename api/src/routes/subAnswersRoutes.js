const { Router } = require('express');
 
const { getSubAnswers } = require("../controllers/subAnswersControllers")

const router = Router();

router.get("/:id", getSubAnswers)

module.exports = router