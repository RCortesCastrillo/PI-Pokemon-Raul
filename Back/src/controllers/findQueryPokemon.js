
const { Pokemon, Type } = require('../db');
const axios =require('axios')
const { Op } = require("sequelize");

    const findQueryPokemon=async(pokemonName)=>{
          
        try {
            let pokeFound;
            const foundingPoke= await Pokemon.findOne({
                where: { 
                    name: {[Op.iLike]: pokemonName}
                },
                include:{ 
                    model:Type,
                    attributes:["name"],
                    through:{
                        attributes:[],
                    }}
    
            });
    

            if(foundingPoke){

                pokeFound={
                 ...foundingPoke.toJSON(),
                 Types:foundingPoke.Types.map((type) => type.name)
              }
     
             return pokeFound

            }

           const {data}= await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            
           if (!data)throw new Error('hubo un error en la API pokemon');

           const { id, name, sprites, stats, height, weight, types }=data
       
       
             
             const life=stats.find(stat=>stat.stat.name === 'hp').base_stat;
             const attack=stats.find(stat=>stat.stat.name === 'attack').base_stat;
             const defense=stats.find(stat=>stat.stat.name === 'defense').base_stat;
             const speed=stats.find(stat=>stat.stat.name === 'speed').base_stat;
             const image=sprites.other.dream_world.front_default;
             const pokemonTypes= types.map((type)=>{ return type.type.name })
           
              pokeFound={id,name,image,height,life,attack,defense,speed,weight,pokemonTypes}




              

            return pokeFound

            
        } catch (error) {
            throw Error(error);
        }
        
    }

    module.exports=findQueryPokemon



    /*
    {
	"id": "60cf202d-195e-48f8-ad12-7a854a73e8f6",
	"name": "sapo verde",
	"image": "https://www.morningkids.net/coloriages/2275/g/pokemon-eevee-g-1.jpg",
	"life": "156",
	"attack": "99",
	"defense": "78",
	"speed": "12",
	"height": "67",
	"weight": "234"
}
*/