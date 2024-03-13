import axios from "axios";






let sapo;

axios("http://localhost:3001/pokemons/a5af38fc-23df-47d0-b07c-e526c8c69131")
.then(({data})=>{console.log(data);})
