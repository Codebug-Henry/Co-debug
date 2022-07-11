const { Router } = require('express');

const { putNotification } = require("../controllers/notificationControllers")

const router = Router();

router.put("/", putNotification)

module.exports = router