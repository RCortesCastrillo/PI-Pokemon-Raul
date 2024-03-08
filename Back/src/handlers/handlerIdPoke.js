
const findIdPoke=require('../controllers/findIdPoke')

module.exports=async(req,res)=>{

try {
    const pokemonId=req.params.idPokemon
    const pokemonFound=await findIdPoke(pokemonId)
    res.status(200).json(pokemonFound)





} catch (error) {
    res.status(500).json({error:error.message})
}

}