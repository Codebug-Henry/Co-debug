const { Router } = require('express');

const { getAnswers } = require("../controllers/answersControllers")

const router = Router();

router.get("/:sub", getAnswers)

module.exports = router