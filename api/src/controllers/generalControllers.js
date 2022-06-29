const { User, Question, Answer,MicroTag,MacroTag } = require('../db.js');

//Get user position in ranking
const getUserPosition = async (sub) => {
    try {
        const allUsers = await User.findAll({
            where:{
                statusDeleted: false,
                statusBanned: false
            },
            order: [
            ['myTeachPoints', 'DESC'],
            ['cantAns', 'DESC'],
            ['cantQuest', 'DESC'],
        ]})

        let myPosition

        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].sub === sub) {
                myPosition = i + 1
                break
            }
        }

        return myPosition
    } catch (error) {
        console.log(error)
    }
}

async function questionTags(tagArr,tagType,question){

    // await newQuestion.addMicroTags(microTags)
    // microTags=await newQuestion.getMicroTags()
    
    let tagPromises=tagArr.map(tag=>tagType.findByPk(tag.id))
    //[{"tag":"React","id":1}]
    let tags=await Promise.all(tagPromises)
    //[tags de]
    if(tagType===MacroTag){
        await question.addMacroTags(tags)
        tags=await question.getMacroTags()
    }else{
        await question.addMicroTags(tags)
        tags=await question.getMicroTags()
    }
    return tags
}

// Populate database with random data
const populateDB = async () => {

    const users = [
        { sub: '1',  name: 'Gonzalo',  nickname: 'Gonza', email: 'gonza@gmail.com', locale: 'Argentina', myTeachPoints: 100, favourites: [1, 2, 4], cantFav: 3, cantQuest: 3, cantAns: 1, picture: "https://media-exp1.licdn.com/dms/image/C4E03AQHrPJNaA_xQRQ/profile-displayphoto-shrink_800_800/0/1612972013299?e=1661385600&v=beta&t=1lbIzsR2k2GfKHSO7VFmh6z059m_BLzYXJSZhDLVMSA" },
        { sub: '2',  name: 'Santiago',  nickname: 'Santi', email: 'santi@gmail.com', locale: 'Argentina', myTeachPoints: 200, favourites: [3, 4, 5], cantFav: 3, cantQuest: 2, cantAns: 1, picture: "https://media-exp1.licdn.com/dms/image/C4E03AQHR0-pjCg6BEQ/profile-displayphoto-shrink_800_800/0/1627139903614?e=1661385600&v=beta&t=O7l3OEXo4Y313kbBX52CLRAMezyoQepFpQLNbP9Ss00" },
        { sub: '3',  name: 'Felipe',  nickname: 'Feli', email: 'feli@gmail.com', locale: 'Argentina', myTeachPoints: 300, favourites: [1], cantFav: 1, cantQuest: 1, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/C5635AQHNLEX3mjDpTQ/profile-framedphoto-shrink_800_800/0/1601474459223?e=1656561600&v=beta&t=HQIOWqWDdrSylVr6bW0eaGuBjLJN5HEmhNbrkylu750" },
        { sub: '4',  name: 'David',  nickname: 'Davo', email: 'davo@gmail.com', locale: 'Argentina', myTeachPoints: 400, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/D4D35AQFCuw75x8_2MA/profile-framedphoto-shrink_400_400/0/1643486623169?e=1656561600&v=beta&t=sIToL6P8CIpObL7r8LSdMemnSvH5hgq_zYwJ-dBwdLA" },
        { sub: '5',  name: 'Luciano',  nickname: 'Lucho', email: 'lucho@gmail.com', locale: 'Argentina', myTeachPoints: 500, favourites: [2, 3], cantFav: 2, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/C5603AQESqRrYU1PB7A/profile-displayphoto-shrink_800_800/0/1630024458215?e=1661385600&v=beta&t=CCSGyfdLAShZY2msqz0KVBcKroJL8RH5Au41hcnAI8E" },
        { sub: '6',  name: 'Gustavo',  nickname: 'Gus', email: 'gus@gmail.com', locale: 'Argentina', myTeachPoints: 600, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/C4D03AQF6Ei7KEuOr2Q/profile-displayphoto-shrink_800_800/0/1646031911164?e=1661385600&v=beta&t=tmOY2NZf646gdf3eSsEcgMTCBvfHjwNZY7QFvcRfEuo" },
        { sub: '7',  name: 'Patricio',  nickname: 'Pato', email: 'pato@gmail.com', locale: 'Argentina', myTeachPoints: 700, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/D4D35AQFZmGrAaKPK8A/profile-framedphoto-shrink_800_800/0/1655595844858?e=1656561600&v=beta&t=r8P2z2IiLGH3Q9AElsDQogOe0ftn4GHv4SurIE1DjlA" },
        { sub: '8',  name: 'Matias',  nickname: 'Mati', email: 'mati@gmail.com', locale: 'Argentina', myTeachPoints: 800, cantAns: 1, picture: "https://media-exp1.licdn.com/dms/image/C4E03AQEqpAyopWiyxg/profile-displayphoto-shrink_800_800/0/1570049909786?e=1661385600&v=beta&t=ip-2OyBLJuiOkxhPAcNc7iIZEDcC6hW2G3gNDJngTEA" },
        { sub: '9',  name: 'Fabricio',  nickname: 'Gonza', email: 'gonza@gmail.com', locale: 'Argentina', myTeachPoints: 900, favourites: [1, 2, 4], cantFav: 3, cantQuest: 3, cantAns: 1, picture: "https://media-exp1.licdn.com/dms/image/C4E03AQHrPJNaA_xQRQ/profile-displayphoto-shrink_800_800/0/1612972013299?e=1661385600&v=beta&t=1lbIzsR2k2GfKHSO7VFmh6z059m_BLzYXJSZhDLVMSA" },
        { sub: '10',  name: 'Roberto',  nickname: 'Santi', email: 'santi@gmail.com', locale: 'Argentina', myTeachPoints: 1000, favourites: [3, 4, 5], cantFav: 3, cantQuest: 2, cantAns: 1, picture: "https://media-exp1.licdn.com/dms/image/C4E03AQHR0-pjCg6BEQ/profile-displayphoto-shrink_800_800/0/1627139903614?e=1661385600&v=beta&t=O7l3OEXo4Y313kbBX52CLRAMezyoQepFpQLNbP9Ss00" },
        { sub: '11',  name: 'Patroclo',  nickname: 'Feli', email: 'feli@gmail.com', locale: 'Argentina', myTeachPoints: 1100, favourites: [1], cantFav: 1, cantQuest: 1, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/C5635AQHNLEX3mjDpTQ/profile-framedphoto-shrink_800_800/0/1601474459223?e=1656561600&v=beta&t=HQIOWqWDdrSylVr6bW0eaGuBjLJN5HEmhNbrkylu750" },
        { sub: '12',  name: 'Aquiles',  nickname: 'Davo', email: 'davo@gmail.com', locale: 'Argentina', myTeachPoints: 1200, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/D4D35AQFCuw75x8_2MA/profile-framedphoto-shrink_400_400/0/1643486623169?e=1656561600&v=beta&t=sIToL6P8CIpObL7r8LSdMemnSvH5hgq_zYwJ-dBwdLA" },
        { sub: '13',  name: 'Asdsdds',  nickname: 'asd', email: 'lucho@gmail.com', locale: 'Argentina', myTeachPoints: 1300, favourites: [2, 3], cantFav: 2, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/C5603AQESqRrYU1PB7A/profile-displayphoto-shrink_800_800/0/1630024458215?e=1661385600&v=beta&t=CCSGyfdLAShZY2msqz0KVBcKroJL8RH5Au41hcnAI8E" },
        { sub: '14',  name: 'Fsdsdsdsd',  nickname: 'asdsad', email: 'gus@gmail.com', locale: 'Argentina', myTeachPoints: 1400, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/C4D03AQF6Ei7KEuOr2Q/profile-displayphoto-shrink_800_800/0/1646031911164?e=1661385600&v=beta&t=tmOY2NZf646gdf3eSsEcgMTCBvfHjwNZY7QFvcRfEuo" },
        { sub: '15',  name: 'Cssdsdsd',  nickname: 'asdasd', email: 'pato@gmail.com', locale: 'Argentina', myTeachPoints: 1500, cantAns: 2, picture: "https://media-exp1.licdn.com/dms/image/D4D35AQFZmGrAaKPK8A/profile-framedphoto-shrink_800_800/0/1655595844858?e=1656561600&v=beta&t=r8P2z2IiLGH3Q9AElsDQogOe0ftn4GHv4SurIE1DjlA" },
        { sub: '16',  name: 'HGghghgh',  nickname: 'asdasd', email: 'mati@gmail.com', locale: 'Argentina', myTeachPoints: 1600, cantAns: 1, picture: "https://media-exp1.licdn.com/dms/image/C4E03AQEqpAyopWiyxg/profile-displayphoto-shrink_800_800/0/1570049909786?e=1661385600&v=beta&t=ip-2OyBLJuiOkxhPAcNc7iIZEDcC6hW2G3gNDJngTEA" },
    ]

    const questions = [
        { userSub: 1, teachPoints: 100,  title: 'Javascript', text: 'Que es un bucle for?', cantAnswers: 3 },
        { userSub: 1, teachPoints: 200,  title: 'Github', text: 'Como hacer git push?', cantAnswers: 5 },
        { userSub: 1, teachPoints: 300,  title: 'React', text: 'Que es un hook?', cantAnswers: 2 },
        { userSub: 2, teachPoints: 400,  title: 'Node', text: 'Como funciona express?', cantAnswers: 1 },
        { userSub: 2, teachPoints: 500,  title: 'Sequelize', text: 'Que son los mixins?', cantAnswers: 2 },
        { userSub: 3, teachPoints: 600,  title: 'Redux', text: 'Como se configura una store?', cantAnswers: 0 },
    ]

    const answers = [
        { userSub: 3, questionId: 1, teachPoints: 100, text: 'El bucle for es una estructura de control en programación en la que se puede indicar de antemano el número máximo de iteraciones' },
        { userSub: 4, questionId: 1, teachPoints: 100, text: 'Su uso principal se orienta a los vectores, pudiendo modificar, agregar, eliminar o consultar datos que se encuentren según el índice.' },
        { userSub: 5, questionId: 1, teachPoints: 100, text: 'Por esto último, una condición mínima del vector es que debe ser ordenado, porque si se intenta leer un dato inexistente, esto genera un error de programación.' },
        { userSub: 6, questionId: 2, teachPoints: 100, text: 'El comando git push se usa para cargar contenido del repositorio local a un repositorio remoto.' },
        { userSub: 7, questionId: 2, teachPoints: 100, text: 'El envío es la forma de transferir confirmaciones desde tu repositorio local a un repositorio remoto' },
        { userSub: 8, questionId: 2, teachPoints: 200, text: 'Es el equivalente a git fetch, pero mientras que al recuperar se importan las confirmaciones a ramas locales, al enviar estas se exportan a ramas remotas.' },
        { userSub: 3, questionId: 2, teachPoints: 200, text: 'Las ramas remotas se configuran mediante el comando git remote' },
        { userSub: 4, questionId: 2, teachPoints: 200, text: 'Los envíos pueden sobrescribir los cambios, por lo que se debe tener cuidado a la hora de realizarlos.' },
        { userSub: 5, questionId: 3, teachPoints: 200, text: 'Un Hook es una función especial que permite “conectarse” a características de React' },
        { userSub: 2, questionId: 3, teachPoints: 300, text: 'Por ejemplo, useState es un Hook que te permite añadir el estado de React a un componente de función' },
        { userSub: 1, questionId: 4, teachPoints: 200, text: 'Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares.' },
        { userSub: 6, questionId: 5, teachPoints: 300, text: 'Cuando se define una asociación entre dos modelos, las instancias de esos modelos obtienen métodos especiales para interactuar con sus contrapartes asociadas.' },
        { userSub: 7, questionId: 5, teachPoints: 500, text: 'Por ejemplo, si tenemos dos modelos, Foo y Bar, y están asociados, sus instancias tendrán disponibles diferentes métodos/mixins, según el tipo de asociación' },
    ]

    const macros=[
        {tag:"JavaScript"},
        {tag:"React"},
        {tag:"Redux"},
        {tag:"Html"},
        // {text:"GitHub",type:"Macro"},
        // {text:"DataBase",type:"Macro"},
        // {text:"Css",type:"Macro"},
        // {text:"Postgress",type:"Macro"},
        // {text:"Sequelize",type:"Macro"},
        // {text:"Deployment",type:"Macro"},
        // {text:"Back-End",type:"Macro"},
        // {text:"Front-End",type:"Macro"},
        // {text:"Visual-Code-Studio",type:"Macro"},
        // {text:"Power-Shell",type:"Macro"},
        // {text:"FrameWorks",type:"Macro"},
        // {text:"Http",type:"Macro"},
        // {text:"Node",type:"Macro"},
    ]

    const micros=[
        {tag:"Arrays"},
        {tag:"Functions"},
        {tag:"Objetos"},
        {tag:"Bucles"},
        {tag:"Clases"},
        {tag:"Condicionales"},
        {tag:"Css"},

        // {text:"TypeScript",type:"Micro"},
        // {text:"Apis",type:"Micro"},
        // {text:"Window",type:"Micro"},
        // {text:"Parseo",type:"Micro"},
        // {text:"For-In",type:"Micro"},
        // {text:"J-Query",type:"Micro"},
    ]

    try {

        await User.bulkCreate(users)
        await Question.bulkCreate(questions)
        await Answer.bulkCreate(answers) 
        await MacroTag.bulkCreate(macros) 
        let microTags=await MicroTag.bulkCreate(micros) 
        let Js=await MacroTag.findOne({where:{tag:"JavaScript"}})
        let Html=await MacroTag.findOne({where:{tag:"Html"}})

        await Js.addMicroTags(microTags.slice(0,microTags.length-1))
        await Html.addMicroTags(microTags[microTags.length-1])

        console.log("DB populated correctly")

    } catch (error) {
        console.log(error.message)
    }
}

const paginate = (limit, page, arr)=>{

    const startIndex = (page - 1) * limit

    const endIndex = (page) * limit

    const results = arr.slice(startIndex, endIndex)

    let aux = Math.ceil(arr.length / limit)

    let totalPages = aux

    let pages = []

    while (aux > 0) {
        pages.unshift(aux)
        aux = aux - 1
    }

    switch (page) {
        case 1:
            pages = pages.filter(p => p < page + 5)
            break
        case 2:
            pages = pages.filter(p => p < page + 4)
            break
        case pages.length - 1:
            pages = pages.filter(p => p > page - 4)
            break
        case pages.length:
            pages = pages.filter(p => p > page - 5)
            break
        default:
            pages = pages.filter(p => p > page - 3 && p < page + 3)
    }

    return {
        totalPages,
        pages,
        results
    }
}

// Callback function for descending sort
// const sortByPointsDesc = (a, b) => {
//     return b.teachPoints - a.teachPoints
// }

// Callback function for ascending sort
// const sortByPointsAsc = (a, b) => {
//     return a.teachPoints - b.teachPoints
// }

module.exports={
    populateDB,
    paginate,
    getUserPosition,
    questionTags,
    // sortByPointsDesc,
    // sortByPointsAsc,
}