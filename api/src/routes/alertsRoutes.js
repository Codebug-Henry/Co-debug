const { Router } = require('express');
 
const { getAllAlerts } = require("../controllers/alertsControllers")

const router = Router();

router.get("/", getAllAlerts)

module.exports = router