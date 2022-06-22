const { Router } = require('express');

const { getTopTen,getRanking } = require("../controllers/usersControllers")

const router = Router();

router.get("/topTen", getTopTen)

router.get("/", getRanking)

module.exports = router