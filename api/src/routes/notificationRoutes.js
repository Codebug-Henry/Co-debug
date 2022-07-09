const { Router } = require('express');

const { postNotification, putNotification } = require("../controllers/notificationControllers")

const router = Router();

router.post("/", postNotification)

router.put("/", putNotification)

module.exports = router