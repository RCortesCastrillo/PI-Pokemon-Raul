// const { Router } = require('express');
const axios=require('axios')
const { Router }=require('express')
const createTypes=require('../controllers/createTypes')
const getTypes=require('../controllers/getTypes')

const typesRouter=Router()

typesRouter.get('/',async(req,res)=>{
   const arrayTypes= await getTypes()

   res.status(200).json(arrayTypes)})



typesRouter.get('/createTypes',async(req,res)=>{

    try {
        
        const dataTypes= await axios('https://pokeapi.co/api/v2/type')
        
        const pokemonTypes=dataTypes.data.results
          
       const newTypes= await createTypes(pokemonTypes)

       res.status(200).send(newTypes)

    } catch (error) {
        res.json({error:error.message})
    }       
 })


module.exports=typesRouter

// axios('https://pokeapi.co/api/v2/type').then(({data})=>{

// const arrayTypes= data.results;
// const types=arrayTypes.map(type=>type.name)
// console.log(types)})


// module.exports=typesRouter
// async function pepe(){


//     const sapo= await axios('https://pokeapi.co/api/v2/type')
//     const papas=sapo.data.results
//     console.log(papas);
// }

// pepe()