import axios from "axios";






let sapo;

axios("http://localhost:3001/pokemons/1").then(
    ({data})=>{console.log(data)
    sapo=data.id
   console.log( typeof(sapo))
    }
)