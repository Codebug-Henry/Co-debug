// Callback function for descending sort
const sortQuestionsDesc = (a, b) => {
    return b.teachPoints - a.teachPoints
}

// Callback function for ascending sort
const sortQuestionsAsc = (a, b) => {
    return a.teachPoints - b.teachPoints
}

module.exports={
    sortQuestionsDesc,
    sortQuestionsAsc,
}