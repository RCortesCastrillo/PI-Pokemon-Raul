
// creamos el router para rutas pokemon
const { Router } = require('express');
const pokemonsRouter=Router()



//importamos los handlers los cuales tienen la logica de los request and responses 
const handlerGetAllPoke=require('../handlers/handlerGetAllPoke')
const handlerIdPoke=require('../handlers/handlerIdPoke')
const handlerCreatePoke=require('../handlers/hanlerCreatePoke')
const handlerFindQuery=require('../handlers/handlerFindQuery')


pokemonsRouter.get('/name', handlerFindQuery);
pokemonsRouter.get('/',handlerGetAllPoke);
pokemonsRouter.get('/:idPokemon',handlerIdPoke);
pokemonsRouter.post('/',handlerCreatePoke);








//importamos el router de pokemons
module.exports=pokemonsRouter



