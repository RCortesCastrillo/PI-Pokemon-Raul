import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import styles from "../SearchBar/SearchBar.module.scss";

const SearchBar = () => {


  

  
  

  return (
    <div className={styles.container}>
      <input
        type="search"
        placeholder="Buscar por nombre"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.button} onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;
