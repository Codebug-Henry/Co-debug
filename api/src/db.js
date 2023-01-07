require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_DEPLOY } = process.env;

let sequelize =
  process.env.NODE_ENV === 'production'
    ? new Sequelize(DB_DEPLOY, {
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },

        logging: false,
        native: false,

        ssl: true,
      })
    : new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/codebug`, {
        logging: false,
        native: false,
      });

// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/codebug`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const {
  User,
  Question,
  Answer,
  Message,
  MacroTag,
  MicroTag,
  Alert,
  Notification,
  SubAnswer,
} = sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Question);
Question.belongsTo(User);

User.hasMany(Answer);
Answer.belongsTo(User);

Question.hasMany(Answer);
Answer.belongsTo(Question);

Question.belongsToMany(MicroTag, { through: 'question_microtag' });
MicroTag.belongsToMany(Question, { through: 'question_microtag' });
Question.belongsToMany(MacroTag, { through: 'question_macrotag' });
MacroTag.belongsToMany(Question, { through: 'question_macrotag' });

MacroTag.hasMany(MicroTag);
MicroTag.belongsTo(MacroTag);

User.hasMany(Message);
Message.belongsTo(User);

Question.hasMany(Alert);
Alert.belongsTo(Question);

Answer.hasMany(Alert);
Alert.belongsTo(Answer);

User.hasMany(Notification);
Notification.belongsTo(User);

User.hasMany(SubAnswer);
SubAnswer.belongsTo(User);

Answer.hasMany(SubAnswer);
SubAnswer.belongsTo(Answer);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
