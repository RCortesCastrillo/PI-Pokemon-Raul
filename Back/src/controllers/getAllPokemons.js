const axios=require('axios');
const { Pokemon, Type } = require('../db');


function getAllPokemons() {
    return axios.get('https://pokeapi.co/api/v2/pokemon?limit=1')
        .then(response => {
            const pokemonData = response.data.results;
            const pokemonPromises = pokemonData.map((element) => axios.get(element.url));
            return Promise.all(pokemonPromises);
        })
        .then(responses => {
            const miArray = [];

            responses.forEach(({ data }) => {
                const { id, name, sprites, stats, height, weight, types } = data;
                const life = stats.find(stat => stat.stat.name === 'hp').base_stat;
                const attack = stats.find(stat => stat.stat.name === 'attack').base_stat;
                const defense = stats.find(stat => stat.stat.name === 'defense').base_stat;
                const speed = stats.find(stat => stat.stat.name === 'speed').base_stat;
                const image = sprites.other.dream_world.front_default;
                const pokemonTypes = types.map(type => type.type.name);

                miArray.push({ id, name, image, height, life, attack, defense, speed, weight, pokemonTypes });
            });

            return Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ['name'],
                    through: {
                        attributes: [],
                    }
                }
            }).then(arrayDataBase => {
                arrayDataBase.forEach(poke => {
                    const pokeObject = {
                        ...poke.toJSON(),
                        Types: poke.Types.map(type => type.name)
                    };
                    miArray.push(pokeObject);
                });

                return miArray;
            });
        })
        .catch(error => {
            throw new Error(error.message);
        });
}

module.exports = getAllPokemons;