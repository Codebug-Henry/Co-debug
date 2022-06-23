const { User } = require('../db')

const getTopTen = async (req,res,next)=>{
    const allUsers = await User.findAll()
      let sortedUsers = allUsers.sort(function (a, b) {
          if (a.myTeachPoints > b.myTeachPoints) {
            return -1;
          }
          if (b.myTeachPoints > a.myTeachPoints) {
            return 1;
          }
          return 0;
        })

      res.send (sortedUsers.slice(0,10))
}

const getRanking = async (req,res,next)=>{
    //  /users?sort=ascendent/descendent
    const allUsers = await User.findAll()
      let sortedUsers = req.query.sort === "ascendente" ?
        allUsers.sort(function (a, b) {
          if (a.myTeachPoints > b.myTeachPoints) {
            return 1;
          }
          if (b.myTeachPoints > a.myTeachPoints) {
            return -1;
          }
          return 0;
        }) :
        allUsers.sort(function (a, b) {
          if (a.myTeachPoints > b.myTeachPoints) {
            return -1;
          }
          if (b.myTeachPoints > a.myTeachPoints) {
            return 1;
          }
          return 0;
        })

      res.send (sortedUsers)
 }

module.exports={
    getTopTen,
    getRanking
}