
const findQueryPokemon = require('../controllers/findQueryPokemon')


module.exports=async (req, res) =>{
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Falta el parámetro de consulta "name"' });
        }

        const pokemon = await findQueryPokemon(name)
        
        

        if (!pokemon) {
            return res.status(404).json({ error: 'No se encontró un Pokémon con ese nombre' });
        }

      

        res.status(200).json(pokemon);
    } catch (error) {
        
        if (error.message.includes('404')) {
            // El mensaje de error indica que se trata de un error 404
            return res.status(404).json({ error: 'No se encontró un Pokémon con ese nombre' });
        } else {
            // Otro tipo de error
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        
    }
}