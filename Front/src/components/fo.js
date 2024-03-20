import axios from "axios";






let sapo;

axios("http://localhost:3001/pokemons/a5af38fc-23df-47d0-b07c-e526c8c69131")
.then(({data})=>{console.log(data);})





export const searchPokemons = (searchTerm) => {
    return async (dispatch) => {
      try {
        let url = `${URL}`;
  
        if (searchTerm) {
          url = `${URL}/name?name=${searchTerm}`;
        }
  
        const { data } = await axios.get(url);
        let allPokemons = [];
  
  
        if( typeof data === 'object' && data !==null ){allPokemons.push(data)}
  
  
        else if (Array.isArray(data)){
          const response = await axios.get(`${URL}`);
          allPokemons=response.data
        }else{console.error('la respuesta no es ni un array ni un objeto ',data);}
  
        
        dispatch({type:SET_POKEMONS, payload:allPokemons});
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  };