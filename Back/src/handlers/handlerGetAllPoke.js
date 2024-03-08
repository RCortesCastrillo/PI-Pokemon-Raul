const getAllPokemons=require('../controllers/getAllPokemons')


module.exports= async (req, res) => {
    try {
        const sapo = await getAllPokemons(); // Espera a que se resuelva la promesa de getPokemons()
        res.status(200).send(sapo);
    } catch (error) {
        console.error(error);
        res.status(500).json({error:error.message});
    }
}