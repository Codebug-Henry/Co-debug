const { Router } = require('express');

const userRoutes = require("./userRoutes")
const usersRoutes = require("./usersRoutes")

const questionRoutes = require("./questionRoutes")
const questionsRoutes = require("./questionsRoutes")

const answerRoutes = require("./answerRoutes")
const answersRoutes = require("./answersRoutes")

const tagsRoutes = require("./tagsRoutes")

const messageRoutes = require("./messageRoutes")
const messagesRoutes = require("./messagesRoutes")

const alertRoutes = require("./alertRoutes")
const alertsRoutes = require("./alertsRoutes")

const notificationRoutes = require("./notificationRoutes")
const notificationsRoutes = require("./notificationsRoutes")

const subAnswerRoutes = require("./subAnswerRoutes")
const subAnswersRoutes = require("./subAnswersRoutes")


const router = Router()

router.use("/user", userRoutes)
router.use("/users", usersRoutes)

router.use("/question", questionRoutes)
router.use("/questions", questionsRoutes)

router.use("/answer", answerRoutes)
router.use("/answers", answersRoutes)

router.use("/tags", tagsRoutes)

router.use("/message", messageRoutes)
router.use("/messages", messagesRoutes)

router.use("/alert", alertRoutes)
router.use("/alerts", alertsRoutes)

router.use("/notification", notificationRoutes)
router.use("/notifications", notificationsRoutes)

router.use("/subAnswer", subAnswerRoutes)
router.use("/subAnswers", subAnswersRoutes)

module.exports = router
