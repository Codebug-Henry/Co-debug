const { Router } = require('express');

const userRoutes = require("./userRoutes")
const usersRoutes = require("./usersRoutes")

const questionRoutes = require("./questionRoutes")
const questionsRoutes = require("./questionsRoutes")

const answerRoutes = require("./answerRoutes")
const answersRoutes = require("./answersRoutes")

const messageRoutes = require("./messageRoutes")
const messagesRoutes = require("./messagesRoutes")

const router = Router()

router.use("/user", userRoutes)
router.use("/users", usersRoutes)

router.use("/question", questionRoutes)
router.use("/questions", questionsRoutes)

router.use("/answer", answerRoutes)
router.use("/answers", answersRoutes)

router.use("/message", messageRoutes)
router.use("/messages", messagesRoutes)

module.exports = router
