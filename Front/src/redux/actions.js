import axios from "axios";
import {GET_POKEMONS,
        SET_POKEMONS,
        SET_TYPES,FILTER_BY_TYPE,
        FILTER_BY_ORIGIN,
        SORT_BY_ORDER,
        RESET_FILTERS,
        SET_POKEMONS_PER_PAGE,
        SET_CURRENT_PAGE,
        SET_SELECTED_POKEMON,
        CREATE_POKEMON_REQUEST,
        CREATE_POKEMON_SUCCESS,
        CREATE_POKEMON_FAILURE

      
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
      const dbPokemons = [];

      dbPokemons.push(data)
     

      dispatch({type:SET_POKEMONS, payload:dbPokemons});
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


export const fetchPokemonById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/${id}`);
      const pokemon = response.data;
      dispatch({type:SET_SELECTED_POKEMON,payload: pokemon});
    } catch (error) {
      console.error("Error fetching Pokemon by ID:", error);
    }
  };
};



export const crearPokemonRequest = () => ({
  type: CREATE_POKEMON_REQUEST,
});

export const crearPokemonSuccess = (pokemon) => ({
  type: CREATE_POKEMON_SUCCESS,
  payload: pokemon,
});

export const crearPokemonFailure = (error) => ({
  type: CREATE_POKEMON_FAILURE,
  payload: error,
});

export const crearPokemon = (pokemonData) => async (dispatch) => {
  dispatch(crearPokemonRequest());

  try {
    const response = await fetch(`${URL}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pokemonData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(crearPokemonSuccess(data.poke));
    } else {
      dispatch(crearPokemonFailure('Error al crear el Pokemon'));
    }
  } catch (error) {
    dispatch(crearPokemonFailure('Error de red'));
  }
};
