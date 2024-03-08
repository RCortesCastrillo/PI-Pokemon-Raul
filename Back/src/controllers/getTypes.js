const {Type}=require('../db')


const createTypes=async()=>{
     const miArray=[]
    const arrayTypes= await Type.findAll()
    

  arrayTypes.map((element)=> miArray.push(element.name))

     return miArray
}



module.exports=createTypes