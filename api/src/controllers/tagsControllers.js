const {MacroTag,MicroTag} = require("../db")

const getTags=async (req, res, next)=>{
    try {
        let tags=await MacroTag.findAll({
            include:MicroTag
        })
        res.send(tags)
    } catch (error) {
        next(error)
    }
}

// const postTag=async (req, res, next)=>{
//     const {macro,micros} = req.body
//     try {
//         let tags=await MacroTag.create(macro)
//         micros.findall
//         macro.addmiucros
//         res.send(tags)
//     } catch (error) {
//         next(error)
//     }
// }

module.exports={
    getTags,
    // postTag
}