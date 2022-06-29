const { Router } = require('express');
 
const { getAllMessages } = require("../controllers/messagesControllers")

const router = Router();

router.get("/", getAllMessages)

module.exports = router