const { User, Question, Answer } = require('../db.js');

// Callback function for descending sort
const sortByPointsDesc = (a, b) => {
    return b.teachPoints - a.teachPoints
}

// Callback function for ascending sort
const sortByPointsAsc = (a, b) => {
    return a.teachPoints - b.teachPoints
}

// Populate database with random data
const populateDB = async () => {

    const users = [
        { sub: '1',  name: 'Gonzalo',  nickname: 'gonza', email: 'gonza@gmail.com', locale: 'argentina', favourites: [1, 2, 4]},
        { sub: '2',  name: 'Santiago',  nickname: 'santi', email: 'santi@gmail.com', locale: 'argentina', favourites: [3, 4, 5]},
        { sub: '3',  name: 'Felipe',  nickname: 'feli', email: 'feli@gmail.com', locale: 'argentina', favourites: [1]},
        { sub: '4',  name: 'David',  nickname: 'davo', email: 'davo@gmail.com', locale: 'argentina'},
        { sub: '5',  name: 'Luciano',  nickname: 'lucho', email: 'lucho@gmail.com', locale: 'argentina', favourites: [2, 3]},
        { sub: '6',  name: 'Gustavo',  nickname: 'gus', email: 'gus@gmail.com', locale: 'argentina'},
        { sub: '7',  name: 'Patricio',  nickname: 'pato', email: 'pato@gmail.com', locale: 'argentina'},
        { sub: '8',  name: 'Matias',  nickname: 'mati', email: 'mati@gmail.com', locale: 'argentina'},
    ]

    const questions = [
        { userSub: 1, teachPoints: 100,  title: 'Javascript', text: 'Que es un bucle for?', cantAnswers: 3 },
        { userSub: 1, teachPoints: 250,  title: 'Github', text: 'Como hacer git push?', cantAnswers: 5 },
        { userSub: 1, teachPoints: 330,  title: 'React', text: 'Que es un hook?', cantAnswers: 2 },
        { userSub: 2, teachPoints: 70,  title: 'Node', text: 'Como funciona express?', cantAnswers: 1 },
        { userSub: 2, teachPoints: 400,  title: 'Sequelize', text: 'Que son los mixins?', cantAnswers: 2 },
        { userSub: 3, teachPoints: 700,  title: 'Redux', text: 'Como se configura una store?', cantAnswers: 0 },
    ]

    const answers = [
        { userSub: 3, questionId: 1, text: 'El bucle for es una estructura de control en programación en la que se puede indicar de antemano el número máximo de iteraciones' },
        { userSub: 4, questionId: 1, text: 'Su uso principal se orienta a los vectores, pudiendo modificar, agregar, eliminar o consultar datos que se encuentren según el índice.' },
        { userSub: 5, questionId: 1, text: 'Por esto último, una condición mínima del vector es que debe ser ordenado, porque si se intenta leer un dato inexistente, esto genera un error de programación.' },
        { userSub: 6, questionId: 2, text: 'El comando git push se usa para cargar contenido del repositorio local a un repositorio remoto.' },
        { userSub: 7, questionId: 2, text: 'El envío es la forma de transferir confirmaciones desde tu repositorio local a un repositorio remoto' },
        { userSub: 8, questionId: 2, text: 'Es el equivalente a git fetch, pero mientras que al recuperar se importan las confirmaciones a ramas locales, al enviar estas se exportan a ramas remotas.' },
        { userSub: 3, questionId: 2, text: 'Las ramas remotas se configuran mediante el comando git remote' },
        { userSub: 4, questionId: 2, text: 'Los envíos pueden sobrescribir los cambios, por lo que se debe tener cuidado a la hora de realizarlos.' },
        { userSub: 5, questionId: 3, text: 'Un Hook es una función especial que permite “conectarse” a características de React' },
        { userSub: 2, questionId: 3, text: 'Por ejemplo, useState es un Hook que te permite añadir el estado de React a un componente de función' },
        { userSub: 1, questionId: 4, text: 'Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares.' },
        { userSub: 6, questionId: 5, text: 'Cuando se define una asociación entre dos modelos, las instancias de esos modelos obtienen métodos especiales para interactuar con sus contrapartes asociadas.' },
        { userSub: 7, questionId: 5, text: 'Por ejemplo, si tenemos dos modelos, Foo y Bar, y están asociados, sus instancias tendrán disponibles diferentes métodos/mixins, según el tipo de asociación' },
    ]

    try {

        await User.bulkCreate(users)
        await Question.bulkCreate(questions)
        await Answer.bulkCreate(answers) 

        console.log("DB populated correctly")

    } catch (error) {
        console.log(error.message)
    }
}

module.exports={
    sortByPointsDesc,
    sortByPointsAsc,
    populateDB,
}