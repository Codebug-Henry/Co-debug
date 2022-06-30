const { Router } = require('express');

const { getTopTen, getUsers } = require("../controllers/usersControllers")

const router = Router();

router.get("/topTen", getTopTen)

router.get("/", getUsers)

module.exports = router