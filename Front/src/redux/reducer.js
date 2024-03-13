import { 
  GET_POKEMONS,
  SET_POKEMONS,
  SET_TYPES,FILTER_BY_TYPE,
  FILTER_BY_ORIGIN,
  SORT_BY_ORDER,
  RESET_FILTERS ,
  SET_POKEMONS_PER_PAGE,
  SET_CURRENT_PAGE,
  SET_SELECTED_POKEMON,
  CREATE_POKEMON_REQUEST,
  CREATE_POKEMON_SUCCESS,
  CREATE_POKEMON_FAILURE


  } from "./actionTypes";
  
  
 


const initialState={
  pokemons:[],
  filteredPokemons: [],
  types:[],
  order:'asc',
  currentPage: 1,
  pokemonsPerPage: 12,
  types: [],
  originPokemon: [],
  creatingPokemon: false,
  createPokemonError: null,
}

const reducer=(state=initialState,{type,payload})=>{

  switch(type){
  
    case GET_POKEMONS:
        return{...state,
          pokemons:payload,
         filteredPokemons:payload
        }

        case SET_POKEMONS:
          return {
            ...state,
            
            filteredPokemons: payload,
          };

    
          case SET_TYPES:
            return {
              ...state,
              types: payload,
            };




            case FILTER_BY_TYPE:
              console.log("payload:", payload);
              const filteredByType =
                payload === "" || payload === "all"
                  ? state.pokemons
                  : state.pokemons.filter((pokemon) => {
                      console.log("Current Pokemon:", pokemon);
                      console.log("Pokemon Types:", pokemon.pokemonTypes);
        
                      const typesArray = pokemon.pokemonTypes || [];
        
                      return typesArray.length > 0 && typesArray.includes(payload);
                    });
        
              console.log("Filtered By Type:", filteredByType);
              return {
                ...state,
                filteredPokemons: filteredByType,
              };




            
              case FILTER_BY_ORIGIN:
                const filteredByOrigin =
                  payload === "all"
                    ? state.pokemons
                    : state.pokemons.filter((pokemon) =>
                    payload === "API" ? typeof pokemon.id === "number" : typeof pokemon.id !== "number");
                console.log("Filtered By Origin:", filteredByOrigin);
          
                return {
                  ...state,
                  filteredPokemons: filteredByOrigin,
                };


                case SORT_BY_ORDER:
                  const { orderBy, order } = payload;
                  console.log("payload:",payload)
                  if (orderBy === "default") {
                    return {
                      ...state,
                      order: "asc",
                      filteredPokemons: state.pokemons,
                      
                    };
                  }
            
                  const sortedPokemons = [...state.filteredPokemons];
            
                  sortedPokemons.sort((a, b) => {
                    if (orderBy === "name") {
                      const nameA = a.name.toLowerCase();
                      const nameB = b.name.toLowerCase();
                      return order === "asc"
                        ? nameA.localeCompare(nameB)
                        : nameB.localeCompare(nameA);
                    } else if (orderBy === "attack") {
                      return order === "asc" ? a.attack - b.attack : b.attack - a.attack;
                    }
            
                    return 0;
                  });

                  return {
                    ...state,
                    order,
                    filteredPokemons: sortedPokemons,
                  };

                  case RESET_FILTERS:
                    return {
                      ...state,
                      order: "asc",
                      filteredPokemons: state.pokemons,
                    };

                    case SET_POKEMONS_PER_PAGE:
                      return {
                        ...state,
                        pokemonsPerPage: payload,
                      };
                    case SET_CURRENT_PAGE:
                      return {
                        ...state,
                        currentPage: payload,
                      };
                
                      case SET_SELECTED_POKEMON:
                        return {
                          ...state,
                          selectedPokemon: payload,
                        };

                        case CREATE_POKEMON_REQUEST:
                          return {
                            ...state,
                            creatingPokemon: true,
                            createPokemonError: null,
                          };
                    
                        case CREATE_POKEMON_SUCCESS:
                          return {
                            ...state,
                            creatingPokemon: false,
                            pokemons: [...state.pokemons, payload],
                            filteredPokemons: [...state.filteredPokemons, payload],
                            createPokemonError: null,
                          };
                    
                        case CREATE_POKEMON_FAILURE:
                          return {
                            ...state,
                            creatingPokemon: false,
                            createPokemonError: payload,
                          };




    default:
        return{...state} 

}


}

export default reducer