import Card from '../Card/Card';
import styles from './Cards.module.scss';

const Cards = ({ pokemons }) => {
  return (
    <div className={styles.Container}>
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          life={pokemon.life}
          attack={pokemon.attack}
          defense={pokemon.defense}
          speed={pokemon.speed}
          height={pokemon.height}
          weight={pokemon.weight}
          type={pokemon.pokemonTypes}
        />  
      ))}
    </div>
  );
};

export default Cards;


