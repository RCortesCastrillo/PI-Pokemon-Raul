require('dotenv').config();
const { Sequelize } = require('sequelize');
const PokemonFunction=require('./models/Pokemon');
const TypeFunction= require('./models/Type');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/pokemon`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);

//aqui es donde los modelos se crean o activan  
PokemonFunction(sequelize)
TypeFunction(sequelize)




//destructuring de modelos
const { Pokemon,Type } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Pokemon.belongsToMany(Type,{through:'PokemonType'});
Type.belongsToMany(Pokemon,{through:'PokemonType'});





module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
