import { useState, useEffect } from "react";
import { Pokemon } from "../../components";
import { fetchPokemonsByGeneration } from "../../services";
import { Page, FlexboxList } from "../../templates";
import styles from "./Home.module.css";

const POKEMON_STACK_SIZE = 12;

const HomePage = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementOffsetByPokemonStackSize = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const getFirstGenPokemon = () => {
    fetchPokemonsByGeneration("1").then(setPokemons);
  };

  useEffect(getFirstGenPokemon, []);

  const renderPokemon = (pokemon: IPokemon) => <Pokemon {...pokemon} />;

  const renderPokemons = () => pokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  const showLoadMoreButton = numberOfPokemonShown < pokemons.length && pokemons.length > 0;

  return (
    <Page>
      <div className={styles.container}>
        <FlexboxList onClick={incrementOffsetByPokemonStackSize} showLoadMoreButton={showLoadMoreButton}>
          {renderPokemons()}
        </FlexboxList>
      </div>
    </Page>
  );
};

export default HomePage;
