
const{Pokemon,Type}=require('../db')
const axios =require('axios');
const findIdPoke=async(idPokemon)=>{

try {
    let poke;
    if(isValidUUID(idPokemon)){
          poke=await Pokemon.findByPk(idPokemon,
        {
            include:{ 
            model:Type,
            attributes:["name"],
            through:{
                attributes:[],
            }}});
   
         const pokeObject={
            ...poke.toJSON(),
            Types:poke.Types.map((type) => type.name)
         }
           return pokeObject

        }else{
    
    
        
            const {data}= await axios(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`)
            
            if (!data)throw new Error('hubo un error en la API pokemon');

            const { id, name, sprites, stats, height, weight, types }=data
        
        
              
              const life=stats.find(stat=>stat.stat.name === 'hp').base_stat;
              const attack=stats.find(stat=>stat.stat.name === 'attack').base_stat;
              const defense=stats.find(stat=>stat.stat.name === 'defense').base_stat;
              const speed=stats.find(stat=>stat.stat.name === 'speed').base_stat;
              const image=sprites.other.dream_world.front_default;
              const pokemonTypes= types.map((type)=>{ return type.type.name })
            
               poke={id,name,image,height,life,attack,defense,speed,weight,pokemonTypes}
        }
              
              return poke;
            }
            catch(error){
            throw new Error(error);
        }


        function isValidUUID(uuid) {
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            return uuidRegex.test(uuid);
        }



    }

module.exports=findIdPoke;