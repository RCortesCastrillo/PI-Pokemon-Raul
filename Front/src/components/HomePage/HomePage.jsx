


import Style from "../HomePage/HomePage.module.scss";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { 
  getAllPokemons,fetchTypes,searchPokemons,filterByType,
  filterByOrigin,resetFilters,setPokemonsPerPage,setCurrentPage,
  sortByOrder, } from "../../redux/actions";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";

const HomePage=()=>{



//usamos el dispatch  
const dispatch=useDispatch()

const types =useSelector((state)=>state.types)
const pokemons=useSelector((state)=> state.pokemons)
const filteredPokemons=useSelector((state)=>state.filteredPokemons)
const currentPage = useSelector((state) => state.currentPage);
const pokemonsPerPage = useSelector((state) => state.pokemonsPerPage);

const [typeFilter, setTypeFilter] = useState("");
const [originFilter, setOriginFilter] = useState("");




useEffect(()=>{
  
  dispatch(fetchTypes());
  dispatch(getAllPokemons());
  dispatch(setPokemonsPerPage(12));
},[dispatch])


useEffect(() => {
  setTypeFilter("");
  console.log(filteredPokemons)
  setOriginFilter("");
}, [filteredPokemons]);


const handlePageChange = (page) => {
  dispatch(setCurrentPage(page));
};

const handleSort = (orderBy, order) => {
  if (order === "default") {

    dispatch(resetFilters());
    
  } else {
    dispatch(sortByOrder(orderBy, order));
  }
};


const handleTypeFilterChange = (e) => {
  const selectedType = e.target.value;
  setTypeFilter(selectedType);
  dispatch(filterByType(selectedType));
  handlePageChange(1)
};

const handleOriginFilterChange = (e) => {
  console.log("Origin Filter Value:", e.target.value);
  setOriginFilter(e.target.value);
  dispatch(filterByOrigin(e.target.value));
  handlePageChange(1)
  console.log("Filtered Pokemons after Origin Filter:", filteredPokemons);
};

let filteredDisplayPokemons = filteredPokemons;

  if (typeFilter) {
    filteredDisplayPokemons = filteredDisplayPokemons.filter(
      (pokemon) => pokemon.pokemonTypes && pokemon.pokemonTypes.includes(typeFilter)
    );
  }

  if (originFilter === "API") {
    filteredDisplayPokemons = filteredDisplayPokemons.filter((pokemon) => typeof pokemon.id === "number" );
  } else if (originFilter === "DDBB") {
    filteredDisplayPokemons = filteredDisplayPokemons.filter((pokemon) => typeof pokemon.id !== "number");
  }


  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;

  const displayedPokemons = filteredDisplayPokemons.slice(startIndex, endIndex);


  return (
    <div>{/* contenedor gigante  */}
      <div className={Style.container}>
        <select className={Style.content} onChange={handleTypeFilterChange}>
          <option value="all">Todos los tipos</option> 
          {types.map((type,index) => (
            <option key={index} >
              {type}
            </option>
          ))}
        </select>

        <select className={Style.content} onChange={handleOriginFilterChange} >
          <option value="all">Todos los orígenes</option>
          <option value="API">API</option>
          <option value="DDBB">DDBB</option>
        </select>

        <select className={Style.content} onChange={(e) => handleSort("name", e.target.value)} >
          <option value="default">Ordenar Nombre</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>

        <select className={Style.content} onChange={(e) => handleSort("attack", e.target.value)} >
          <option value="default">Ordenar Ataque</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
      </div>
      <div>
       <Cards pokemons={displayedPokemons}/>
      </div>

      <div>
        <Pagination
          totalPages={Math.ceil(
            filteredDisplayPokemons.length / pokemonsPerPage
          )}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );



}

export default HomePage

