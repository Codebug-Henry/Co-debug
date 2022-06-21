const getAllQuestions=(req,res,next)=>{
    const {search,sort}=req.query

    // if(search) //filtra por search
    // else if( sort) //amoda por siort
    // else finall

}

const getUserQuestions=(req,res,next)=>{
    // por query answered=boolean
    //if(answered===undefined) todo
    // else uno u otro
}

const putFavourites=(req,res,next)=>{
    // /questions/favourites?subUser=" "&idQuestion=" "&add=boolean 
}

const getFavourites=(req,res,next)=>{
   
}

module.exports={
    getAllQuestions,
    getUserQuestions,
    putFavourites,
    getFavourites
}