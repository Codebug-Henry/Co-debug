const { Router } = require('express');
 
const {getAllQuestions,getUserQuestions,getFavourites,putFavourites} = require("../controllers/questionsControllers")

const router = Router();

router.get("/questions/:sub",getUserQuestions)

router.get("/questions",getAllQuestions)

router.get("/questions/favourites/:sub",getFavourites)

router.put("/questions/favourites",putFavourites)



module.exports = router