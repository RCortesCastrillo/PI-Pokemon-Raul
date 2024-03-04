const { Router } = require('express');


const pokemonsRouter=Router()

pokemonsRouter.get('/',(req,res)=>{

res.send('vamos confiando en nuestro Dios')

})




module.exports=pokemonsRouter