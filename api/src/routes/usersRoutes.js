const { Router } = require('express');

const {getTopTen,getRanking} = require("../controllers/usersControllers")

const router = Router();

router.get("/users/topTen",getTopTen)

router.get("/users",getRanking)

module.exports = router