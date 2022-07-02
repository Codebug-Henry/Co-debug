const { Router } = require('express');

const { postMessage, putMessage } = require("../controllers/messageControllers")

const router = Router();

router.post("/", postMessage)

router.put("/", putMessage)

module.exports = router