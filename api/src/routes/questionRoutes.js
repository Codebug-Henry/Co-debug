const { Router } = require('express');

const { postQuestion,putUserQuestion,getSingleQuestion,deleteUserQuestion } = require("../controllers/questionControllers")

const router = Router();

router.post("/", postQuestion)

router.put("/", putUserQuestion)

router.get("/:id", getSingleQuestion)

router.delete("/:id", deleteUserQuestion)

module.exports = router