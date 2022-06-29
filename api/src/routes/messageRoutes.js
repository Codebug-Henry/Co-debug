const { Router } = require('express');

const { postMessage } = require("../controllers/messageControllers")

const router = Router();

router.post("/", postMessage)

module.exports = router