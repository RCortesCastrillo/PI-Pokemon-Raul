import axios from "axios";
import {GET_POKEMONS,
        SET_POKEMONS,
        SET_TYPES,FILTER_BY_TYPE,
        FILTER_BY_ORIGIN,
        SORT_BY_ORDER,
        RESET_FILTERS,
        SET_POKEMONS_PER_PAGE,
        SET_CURRENT_PAGE
      
      }from "./actionTypes";



const URL = "http://localhost:3001/pokemons";


export const getAllPokemons=()=>{
return (dispatch)=>{
axios("http://localhost:3001/pokemons")
.then(({data})=>{
  return dispatch({type:GET_POKEMONS,payload:data})
}).catch((error)=>console.log(error))

}}

export const searchPokemons = (searchTerm) => {
  return async (dispatch) => {
    try {
      let url = `${URL}`;

      if (searchTerm) {
        url = `${URL}/name?name=${searchTerm}`;
      }

      const { data } = await axios.get(url);
      const dbPokemons = data;

      let allPokemons = [];

      if (dbPokemons.length > 0) {
        allPokemons = dbPokemons;
      } else {
        const response = await axios.get(`${URL}`);
        allPokemons = response.data;
      }

      dispatch({type:SET_POKEMONS, payload:allPokemons});
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
};




export const fetchTypes = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/type");
      const types = response.data;
      dispatch({type:SET_TYPES,payload:types});
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };
};


export const filterByType = (type)=>{
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  }
}

export const filterByOrigin = (origin)=>{
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin,
  }
}

export const sortByOrder = (orderBy, order) => ({
  type: SORT_BY_ORDER,
  payload: { orderBy, order },
});

export const resetFilters = () => ({
  type: RESET_FILTERS,
});


export const setPokemonsPerPage = (page) => ({
  type: SET_POKEMONS_PER_PAGE,
  payload: page,
});
export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page,
});