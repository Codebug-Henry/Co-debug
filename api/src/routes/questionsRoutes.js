const { Router } = require('express');
 
const { getAllQuestions,getUserQuestions,getFavourites,putFavourites } = require("../controllers/questionsControllers")

const router = Router();

router.get("/:sub", getUserQuestions)

router.get("/", getAllQuestions)

router.get("/favourites/:sub", getFavourites)

router.put("/favourites", putFavourites)



module.exports = router