const { Router } = require('express');

const {getTags} = require("../controllers/tagsControllers")

const router = Router();

router.get("/", getTags)

// router.post("/", postTag)




// router.get()

module.exports = router