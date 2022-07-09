const { Router } = require('express');
 
const { getNotifications } = require("../controllers/notificationsControllers")

const router = Router();

router.get("/:sub", getNotifications)

module.exports = router