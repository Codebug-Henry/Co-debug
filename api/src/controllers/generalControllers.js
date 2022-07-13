const nodemailer = require("nodemailer");
const { GMAIL, GPASS } = process.env;
const { User, Question, Answer, MicroTag, MacroTag } = require("../db.js");

//Get user position in ranking
const getUserPosition = async (sub) => {
  try {
    const allUsers = await User.findAll({
      where: {
        statusDeleted: false,
        statusBanned: false,
      },
      order: [
        ["myTeachPoints", "DESC"],
        ["cantAns", "DESC"],
        ["cantQuest", "DESC"],
      ],
    });

    let myPosition;

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].sub === sub) {
        myPosition = i + 1;
        break;
      }
    }

    return myPosition;
  } catch (error) {
    console.log(error);
  }
};

async function questionTags(tagArr, tagType, question) {
  // await newQuestion.addMicroTags(microTags);
  // microTags = await newQuestion.getMicroTags();

  let tagPromises = tagArr.map((tag) => tagType.findOne({ where: { tag } }));
  //[{"tag":"React","id":1}]
  let tags = await Promise.all(tagPromises);
  //[tags de]
  if (tagType === MacroTag) {
    await question.addMacroTags(tags);
    tags = await question.getMacroTags();
  } else {
    await question.addMicroTags(tags);
    tags = await question.getMicroTags();
  }
  return tags;
}

// Populate database with random data
const populateDB = async () => {
  const users = [
    {
      sub: "1",
      name: "Gonzalo",
      nickname: "Gonza",
      email: "gonza@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1600,
      favourites: [1, 2, 4],
      cantFav: 3,
      cantQuest: 3,
      cantAns: 1,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1657481931/codebug/tmzjp7bf7apzyexfxhur.jpg",
    },
    {
      sub: "2",
      name: "Santiago",
      nickname: "Santi",
      email: "santi@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1500,
      favourites: [3, 4, 5],
      cantFav: 3,
      cantQuest: 2,
      cantAns: 1,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656613573/codebug/cishty3ie3xxldbgpryt.jpg",
    },
    {
      sub: "3",
      name: "Felipe",
      nickname: "Feli",
      email: "feli@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1400,
      favourites: [1],
      cantFav: 1,
      cantQuest: 1,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656642327/codebug/ls3q6jh4b7nnkstdjvnc.jpg",
    },
    {
      sub: "4",
      name: "David",
      nickname: "Davo",
      email: "davo@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1300,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656635530/codebug/sxaohmgkzc1wvx8u37qj.jpg",
    },
    {
      sub: "5",
      name: "Luciano",
      nickname: "Lucho",
      email: "lucho@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1200,
      favourites: [2, 3],
      cantFav: 2,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1657342483/codebug/gihydgjiirr20wcu1zqw.jpg",
    },
    {
      sub: "6",
      name: "Gustavo",
      nickname: "Gus",
      email: "gus@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1100,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1657552179/codebug/c2hrgarb1urpsbnxutku.jpg",
    },
    {
      sub: "7",
      name: "Patricio",
      nickname: "Pato",
      email: "pato@gmail.com",
      locale: "Argentina",
      myTeachPoints: 1000,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656702863/codebug/mr9jd9vwljre9fdu5yzp.jpg",
    },
    {
      sub: "8",
      name: "Matias",
      nickname: "Mati",
      email: "mati@gmail.com",
      locale: "Argentina",
      myTeachPoints: 900,
      cantAns: 1,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656605851/codebug/gpiz9uxtds9dtihu69cx.png",
    },
    {
      sub: "9",
      name: "Fabricio",
      nickname: "Fabri",
      email: "fabri@gmail.com",
      locale: "Argentina",
      myTeachPoints: 800,
      favourites: [1, 2, 4],
      cantFav: 3,
      cantQuest: 3,
      cantAns: 1,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656857276/codebug/xatglaepqkmsuoh6kejw.jpg",
    },
    {
      sub: "10",
      name: "Roberto",
      nickname: "Rober",
      email: "rober@gmail.com",
      locale: "Argentina",
      myTeachPoints: 700,
      favourites: [3, 4, 5],
      cantFav: 3,
      cantQuest: 2,
      cantAns: 1,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656939594/codebug/v9gblm0zzb2hfzjsivdu.jpg",
    },
    {
      sub: "11",
      name: "Patroclo",
      nickname: "Patroclo",
      email: "patroclo@gmail.com",
      locale: "Argentina",
      myTeachPoints: 600,
      favourites: [1],
      cantFav: 1,
      cantQuest: 1,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656642327/codebug/ls3q6jh4b7nnkstdjvnc.jpg",
    },
    {
      sub: "12",
      name: "Aquiles",
      nickname: "Aquiles",
      email: "aquiles@gmail.com",
      locale: "Argentina",
      myTeachPoints: 500,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656635530/codebug/sxaohmgkzc1wvx8u37qj.jpg",
    },
    {
      sub: "13",
      name: "Julieta",
      nickname: "Juli",
      email: "juli@gmail.com",
      locale: "Argentina",
      myTeachPoints: 400,
      favourites: [2, 3],
      cantFav: 2,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656901868/codebug/tgopgksiycfzlby7igma.gif",
    },
    {
      sub: "14",
      name: "Marcelo",
      nickname: "Marce",
      email: "marce@gmail.com",
      locale: "Argentina",
      myTeachPoints: 300,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656968392/codebug/oz7jaaw0drs5cepygypy.jpg",
    },
    {
      sub: "15",
      name: "Natalia",
      nickname: "Nati",
      email: "nati@gmail.com",
      locale: "Argentina",
      myTeachPoints: 200,
      cantAns: 2,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656901868/codebug/tgopgksiycfzlby7igma.gif",
    },
    {
      sub: "16",
      name: "Camila",
      nickname: "Cami",
      email: "cami@gmail.com",
      locale: "Argentina",
      myTeachPoints: 100,
      cantAns: 1,
      picture:
        "https://res.cloudinary.com/codebugers/image/upload/v1656959870/codebug/svgczjrwzxsi6puerdqh.jpg",
    },
  ];

  const questions = [
    {
      userSub: 1,
      teachPoints: 100,
      title: "Javascript",
      text: "Que es un bucle for?",
      cantAnswers: 3,
    },
    {
      userSub: 1,
      teachPoints: 200,
      title: "Github",
      text: "Como hacer git push?",
      cantAnswers: 5,
    },
    {
      userSub: 1,
      teachPoints: 300,
      title: "React",
      text: "Que es un hook?",
      cantAnswers: 2,
    },
    {
      userSub: 2,
      teachPoints: 400,
      title: "Node",
      text: "Como funciona express?",
      cantAnswers: 1,
    },
    {
      userSub: 2,
      teachPoints: 500,
      title: "Sequelize",
      text: "Que son los mixins?",
      cantAnswers: 2,
    },
    {
      userSub: 3,
      teachPoints: 600,
      title: "Redux",
      text: "Como se configura una store?",
      cantAnswers: 0,
    },
  ];

  const answers = [
    {
      userSub: 3,
      questionId: 1,
      teachPoints: 100,
      text: "El bucle for es una estructura de control en programación en la que se puede indicar de antemano el número máximo de iteraciones",
    },
    {
      userSub: 4,
      questionId: 1,
      teachPoints: 100,
      text: "Su uso principal se orienta a los vectores, pudiendo modificar, agregar, eliminar o consultar datos que se encuentren según el índice.",
    },
    {
      userSub: 5,
      questionId: 1,
      teachPoints: 100,
      text: "Por esto último, una condición mínima del vector es que debe ser ordenado, porque si se intenta leer un dato inexistente, esto genera un error de programación.",
    },
    {
      userSub: 6,
      questionId: 2,
      teachPoints: 100,
      text: "El comando git push se usa para cargar contenido del repositorio local a un repositorio remoto.",
    },
    {
      userSub: 7,
      questionId: 2,
      teachPoints: 100,
      text: "El envío es la forma de transferir confirmaciones desde tu repositorio local a un repositorio remoto",
    },
    {
      userSub: 8,
      questionId: 2,
      teachPoints: 200,
      text: "Es el equivalente a git fetch, pero mientras que al recuperar se importan las confirmaciones a ramas locales, al enviar estas se exportan a ramas remotas.",
    },
    {
      userSub: 3,
      questionId: 2,
      teachPoints: 200,
      text: "Las ramas remotas se configuran mediante el comando git remote",
    },
    {
      userSub: 4,
      questionId: 2,
      teachPoints: 200,
      text: "Los envíos pueden sobrescribir los cambios, por lo que se debe tener cuidado a la hora de realizarlos.",
    },
    {
      userSub: 5,
      questionId: 3,
      teachPoints: 200,
      text: "Un Hook es una función especial que permite “conectarse” a características de React",
    },
    {
      userSub: 2,
      questionId: 3,
      teachPoints: 300,
      text: "Por ejemplo, useState es un Hook que te permite añadir el estado de React a un componente de función",
    },
    {
      userSub: 1,
      questionId: 4,
      teachPoints: 200,
      text: "Express es el framework web más popular de Node, y es la librería subyacente para un gran número de otros frameworks web de Node populares.",
    },
    {
      userSub: 6,
      questionId: 5,
      teachPoints: 300,
      text: "Cuando se define una asociación entre dos modelos, las instancias de esos modelos obtienen métodos especiales para interactuar con sus contrapartes asociadas.",
    },
    {
      userSub: 7,
      questionId: 5,
      teachPoints: 500,
      text: "Por ejemplo, si tenemos dos modelos, Foo y Bar, y están asociados, sus instancias tendrán disponibles diferentes métodos/mixins, según el tipo de asociación",
    },
  ];

  const macros = [
    { tag: "JavaScript" },
    { tag: "HTML" },
    { tag: "DataBase" },
    { tag: "CSS" },
    { tag: "React" },
    { tag: "Cliente HTTP" },
    { tag: "Editor de texto" },
    { tag: "Redux" },
    { tag: "GitHub" },
    { tag: "Sequelize" },
    { tag: "Otro" },
    //     // {text:"Deployment"},
    //     // {text:"Back-End"},
    //     // {text:"Front-End"},
    //     // {text:"Power-Shell"},
    //     // {text:"FrameWorks"},
    //     // {text:"Node"},
  ];

  const microsJavaScript = [
    { id: 1, tag: "Arreglos", macroTagId: 1 },
    { id: 2, tag: "Funciones", macroTagId: 1 },
    { id: 3, tag: "Objetos", macroTagId: 1 },
    { id: 4, tag: "Bucles", macroTagId: 1 },
    { id: 5, tag: "Clases", macroTagId: 1 },
    { id: 6, tag: "Condicionales", macroTagId: 1 },
    { id: 7, tag: "Asincronismo", macroTagId: 1 },
    { id: 8, tag: "Variables", macroTagId: 1 },
    { id: 9, tag: "Enteros", macroTagId: 1 },
    { id: 10, tag: "Strings", macroTagId: 1 },
    { id: 11, tag: "Booleanos", macroTagId: 1 },
    { id: 12, tag: "Errores", macroTagId: 1 },
    { id: 13, tag: "Flotante", macroTagId: 1 },
    { id: 14, tag: "This", macroTagId: 1 },
    { id: 15, tag: "Función generadora", macroTagId: 1 },
    { id: 16, tag: "Promesas", macroTagId: 1 },
    { id: 17, tag: "Set", macroTagId: 1 },
    { id: 18, tag: "JSON", macroTagId: 1 },
    { id: 19, tag: "Otro", macroTagId: 1 },
  ];
  const microsHTML = [
    { id: 22, tag: "Elementos/etiquetas", macroTagId: 2 },
    { id: 23, tag: "Atributos (id/clase)", macroTagId: 2 },
    { id: 24, tag: "Secciones", macroTagId: 2 },
    { id: 25, tag: "Otro", macroTagId: 2 },
  ];

  const microsDataBase = [
    { id: 26, tag: "Tablas", macroTagId: 3 },
    { id: 27, tag: "Comandos", macroTagId: 3 },
    { id: 28, tag: "Objetos (datos tablas)", macroTagId: 3 },
    { id: 29, tag: "Sentencias/consultas", macroTagId: 3 },
    { id: 30, tag: "Sistemas de gestión", macroTagId: 3 },
    { id: 31, tag: "Otro", macroTagId: 3 },
  ];

  const microsCSS = [
    { id: 32, tag: "Display (flex/grid)", macroTagId: 4 },
    { id: 33, tag: "Imágenes", macroTagId: 4 },
    { id: 34, tag: "Estilos/propiedades", macroTagId: 4 },
    { id: 35, tag: "Position", macroTagId: 4 },
    { id: 36, tag: "Responsive", macroTagId: 4 },
    { id: 37, tag: "Media", macroTagId: 4 },
    { id: 38, tag: "Animaciones", macroTagId: 4 },
    { id: 39, tag: "Background", macroTagId: 4 },
    { id: 40, tag: "Pseudo clases (hover/after)", macroTagId: 4 },
    { id: 41, tag: "Frameworks", macroTagId: 4 },
    { id: 42, tag: "Otro", macroTagId: 4 },
  ];

  const microsReact = [
    { id: 43, tag: "Componentes", macroTagId: 5 },
    { id: 44, tag: "JSX", macroTagId: 5 },
    { id: 45, tag: "Propiedades", macroTagId: 5 },
    { id: 46, tag: "Ciclo de vida", macroTagId: 5 },
    { id: 47, tag: "Eventos", macroTagId: 5 },
    { id: 48, tag: "Renderizado", macroTagId: 5 },
    { id: 49, tag: "Formularios", macroTagId: 5 },
    { id: 50, tag: "Estados", macroTagId: 5 },
    { id: 51, tag: "ReactDom", macroTagId: 5 },
    { id: 52, tag: "React-router", macroTagId: 5 },
    { id: 53, tag: "Hooks", macroTagId: 5 },
    { id: 54, tag: "Otro", macroTagId: 5 },
  ];

  const microsClienteHTTP = [
    { id: 55, tag: "Peticiones", macroTagId: 6 },
    { id: 56, tag: "API", macroTagId: 6 },
    { id: 57, tag: "Otro", macroTagId: 6 },
  ];

  const microsEditoresDeTexto = [
    { id: 58, tag: "Sublime Text", macroTagId: 7 },
    { id: 59, tag: "Nova", macroTagId: 7 },
    { id: 60, tag: "Notepad++", macroTagId: 7 },
    { id: 61, tag: "Atom", macroTagId: 7 },
    { id: 62, tag: "Visual Studio Code", macroTagId: 7 },
    { id: 63, tag: "Vim", macroTagId: 7 },
    { id: 64, tag: "Otro", macroTagId: 7 },
  ];

  const microsRedux = [
    { id: 65, tag: "Reducer", macroTagId: 8 },
    { id: 66, tag: "Store", macroTagId: 8 },
    { id: 67, tag: "Actions", macroTagId: 8 },
    { id: 68, tag: "React-redux", macroTagId: 8 },
    { id: 69, tag: "Flujo", macroTagId: 8 },
    { id: 70, tag: "Dispatch", macroTagId: 8 },
    { id: 71, tag: "Middleware", macroTagId: 8 },
    { id: 72, tag: "Estado global", macroTagId: 8 },
    { id: 73, tag: "Otro", macroTagId: 8 },
  ];

  const microsGitHub = [
    { id: 74, tag: "Repositorios", macroTagId: 9 },
    { id: 75, tag: "Cuentas", macroTagId: 9 },
    { id: 76, tag: "Workflow", macroTagId: 9 },
    { id: 77, tag: "Comandos", macroTagId: 9 },
    { id: 78, tag: "Pull request", macroTagId: 9 },
    { id: 79, tag: "Ramas", macroTagId: 9 },
    { id: 80, tag: "Commits", macroTagId: 9 },
    { id: 81, tag: "Otro", macroTagId: 9 },
  ];

  const microsSequelize = [
    { id: 82, tag: "Modelos", macroTagId: 10 },
    { id: 83, tag: "Asociaciones", macroTagId: 10 },
    { id: 84, tag: "Finders", macroTagId: 10 },
    { id: 85, tag: "Instancias", macroTagId: 10 },
    { id: 86, tag: "Métodos", macroTagId: 10 },
    { id: 87, tag: "Getter", macroTagId: 10 },
    { id: 88, tag: "Setters", macroTagId: 10 },
    { id: 89, tag: "Mixins", macroTagId: 10 },
    { id: 90, tag: "Hooks", macroTagId: 10 },
    { id: 91, tag: "Otro", macroTagId: 10 },
  ];

  const microsOtro = [{ id: 92, tag: "Otro", macroTagId: 11 }];

  try {
    await User.bulkCreate(users);
    await Question.bulkCreate(questions);
    await Answer.bulkCreate(answers);
    await MacroTag.bulkCreate(macros);

    let micros = [
      ...microsJavaScript,
      ...microsHTML,
      ...microsDataBase,
      ...microsCSS,
      ...microsReact,
      ...microsClienteHTTP,
      ...microsEditoresDeTexto,
      ...microsRedux,
      ...microsGitHub,
      ...microsSequelize,
      ...microsOtro,
    ];
    let allMicros = await MicroTag.bulkCreate(micros);

    let Js = await MacroTag.findByPk(1);
    let GH = await MacroTag.findByPk(9);
    let React = await MacroTag.findByPk(5);
    let Sequelize = await MacroTag.findByPk(10);
    let Redux = await MacroTag.findByPk(8);
    let Otro = await MacroTag.findByPk(11);

    let bucles = await MicroTag.findByPk(4);
    let comandos = await MicroTag.findByPk(77);
    let hooks = await MicroTag.findByPk(53);
    let mixins = await MicroTag.findByPk(89);
    let store = await MicroTag.findByPk(66);
    let otro = await MicroTag.findByPk(92);

    let question1 = await Question.findByPk(1);
    let question2 = await Question.findByPk(2);
    let question3 = await Question.findByPk(3);
    let question4 = await Question.findByPk(4);
    let question5 = await Question.findByPk(5);
    let question6 = await Question.findByPk(6);

    await question1.addMacroTag(Js);
    await question1.addMicroTag(bucles);
    await question2.addMacroTag(GH);
    await question2.addMicroTag(comandos);
    await question3.addMacroTag(React);
    await question3.addMicroTag(hooks);
    await question4.addMacroTag(Otro);
    await question4.addMicroTag(otro);
    await question5.addMacroTag(Sequelize);
    await question5.addMicroTag(mixins);
    await question6.addMacroTag(Redux);
    await question6.addMicroTag(store);

    console.log("DB populated correctly");
  } catch (error) {
    console.log(error.message);
  }
};

const paginate = (limit, page, arr) => {
  const startIndex = (page - 1) * limit;

  const endIndex = page * limit;

  const results = arr.slice(startIndex, endIndex);

  let aux = Math.ceil(arr.length / limit);

  let totalPages = aux;

  let pages = [];

  while (aux > 0) {
    pages.unshift(aux);
    aux = aux - 1;
  }

  switch (page) {
    case 1:
      pages = pages.filter((p) => p < page + 5);
      break;
    case 2:
      pages = pages.filter((p) => p < page + 4);
      break;
    case pages.length - 1:
      pages = pages.filter((p) => p > page - 4);
      break;
    case pages.length:
      pages = pages.filter((p) => p > page - 5);
      break;
    default:
      pages = pages.filter((p) => p > page - 3 && p < page + 3);
  }

  return {
    totalPages,
    pages,
    results,
  };
};

const checkEmailAdmin = (obj) => {
  const emails = [
    "matibalbi@gmail.com",
    "gonzalogdv@gmail.com",
    "felipe.guitelman@gmail.com",
    "lucianommorea@gmail.com",
    "patriciogabrielcolella@gmail.com",
    "regenerik@gmail.com",
    "santiagotrabucco@gmail.com",
    "tutemaposo2016@gmail.com",
  ];
  return emails.includes(obj.email);
};

const checkNickname = async (nickname) => {
  let theNickname = await User.findOne({
    where: { nickname },
  })
  console.log("este es el nn" + theNickname);
  return theNickname;
};

const sendEmail = (to, subject, text) => {
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: GMAIL,
      pass: GPASS,
    },
  });
  const mailOptions = {
    from: "Remitente",
    to,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log("Email enviado");
    }
  });
};

// Callback function for descending sort
// const sortByPointsDesc = (a, b) => {
//     return b.teachPoints - a.teachPoints
// }

// Callback function for ascending sort
// const sortByPointsAsc = (a, b) => {
//     return a.teachPoints - b.teachPoints
// }

module.exports = {
  populateDB,
  paginate,
  getUserPosition,
  questionTags,
  checkEmailAdmin,
  sendEmail,
  checkNickname,
  // sortByPointsDesc,
  // sortByPointsAsc,
};
