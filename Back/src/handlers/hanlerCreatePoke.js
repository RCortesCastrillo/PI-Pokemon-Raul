const createPokemon = require('../controllers/createPokemon')




module.exports=async(req,res)=>{
    try {
        //destructuring de las propiedades que nos llegan por boody 
        const { id, name, image, height, life, attack, defense, speed, weight, pokemonTypes}=req.body
        

         // Validaciones
        if ( !name || !image || !height || !life || !attack || !defense || !speed || !weight || !pokemonTypes) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }
          // vereificamos que el array de pokemon types se pueda relacionar al menos con dos 
        if (!Array.isArray(pokemonTypes) || pokemonTypes.length < 2) {
            return res.status(400).json({ error: "Debe seleccionar al menos dos tipos para el Pokémon" });
        }


        const newPokemon= await createPokemon({ 
            name,
             image, 
             height, 
             life, 
             attack, 
             defense, 
             speed,
              weight,
              pokemonTypes});
        res.status(200).json(newPokemon)
        
    } catch (error) {
        res.status(409).json({error:error.message})
    }
}
