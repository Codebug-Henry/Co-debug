const { Router } = require('express');

const { postUser, getUserInfo, getUserPosition, putUserInfo, deleteUser } = require("../controllers/userControllers")

const router = Router();

router.get("/myPosition/:sub", getUserPosition)

router.post("/", postUser)

router.get("/:sub", getUserInfo)

router.put("/:sub", putUserInfo)

router.delete("/:sub", deleteUser)

module.exports = router