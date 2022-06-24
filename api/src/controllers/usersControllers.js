const { User } = require('../db');
const { paginate, sortByPointsDesc, sortByPointsAsc } = require('./generalControllers');

const getTopTen = async (req,res,next)=>{
    const allUsers = await User.findAll()

      let sortedUsers = allUsers.sort(sortByPointsDesc)

      res.send (sortedUsers.slice(0,10))
}

const getRanking = async (req,res,next)=>{
    //  /users?sort=ascendent/descendent
    const allUsers = await User.findAll()

    const {page, limit}=req.query

    let sortedUsers = req.query.sort === "ascendent" 

    ? allUsers.sort(sortByPointsAsc) 
    
    : allUsers.sort(sortByPointsDesc)
    // limit 10  page 5  [elementos]
    res.send (paginate(parseInt(limit), parseInt(page), sortedUsers))
 }

module.exports={
    getTopTen,
    getRanking
}