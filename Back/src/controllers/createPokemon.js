const {Pokemon,Type}=require('../db')
const axios =require('axios')
const { Op } = require("sequelize");

const createPokemon = async ({
    id,
    name,
    image,
    height,
    life,
    attack,
    defense,
    speed,
    weight,
    pokemonTypes
}) => {
    try {
        let pokemon = await Pokemon.findOne({
            where: { name:{[Op.iLike]: name }}
        });

        if (pokemon) {
            throw new Error('Ya existe ese personaje en la base de datos local');
        }

        try {
            const { data } = await axios(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

            throw new Error('El personaje ya existe en la API');
        } catch (error) {
            if (error.response && error.response.status === 404) {
                pokemon = await Pokemon.create({
                    id,
                    name,
                    image,
                    height,
                    life,
                    attack,
                    defense,
                    speed,
                    weight
                });
                     //mapeamos el array de ppokeomTypes para poder hacer las relaciones 
                const typeInstances = await Promise.all(pokemonTypes.map(async typeName => {
                    return await Type.findOne({ where: { name: typeName } });
                }));
            
                // Asociamos los tipos al Pokémon recién creado
                await pokemon.addTypes(typeInstances);
            
                return pokemon;
            } else {
                throw error;
            }
        }
              }        catch (error) {
              // Manejar el error de la consulta findOne aquí
              console.error('Error al crear el Pokémon:', error.message);
             throw  error;
              }
}

module.exports = createPokemon;