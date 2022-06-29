const { Router } = require('express');

const userRoutes = require("./userRoutes")

const usersRoutes = require("./usersRoutes")

const questionRoutes = require("./questionRoutes")

const questionsRoutes = require("./questionsRoutes")

const answerRoutes = require("./answerRoutes")

const answersRoutes = require("./answersRoutes")

const tagsRoutes = require("./tagsRoutes")


const router = Router()

router.use("/user", userRoutes)

router.use("/users", usersRoutes)

router.use("/question", questionRoutes)

router.use("/questions", questionsRoutes)

router.use("/answer", answerRoutes)

router.use("/answers", answersRoutes)

router.use("/tags", tagsRoutes)


module.exports = router
