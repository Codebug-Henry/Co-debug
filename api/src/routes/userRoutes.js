const { Router } = require('express');

const { postUser, getUserInfo, putUserInfo, deleteUser } = require("../controllers/userControllers")

const router = Router();

router.post("/", postUser)

router.get("/:sub", getUserInfo)

router.put("/:sub", putUserInfo)

router.delete("/:sub", deleteUser)

module.exports = router