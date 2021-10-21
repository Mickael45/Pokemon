import { useState, useEffect, useCallback, BaseSyntheticEvent } from "react";
import { Pokemon } from "../../components";
import { usePokemonSort } from "../../../hooks";
import { fetchAllPokemons, fetchPokemonsByType } from "../../../services";
import { Page, FlexboxList } from "../../templates";
import { sortingTypesMap } from "../../../hooks/usePokemonSort";
import styles from "./Home.module.css";
import Dropdown from "../../components/Dropdown/Dropdown";

const POKEMON_STACK_SIZE = 12;

const sortingTypes = Object.values(sortingTypesMap);

const HomePage = () => {
  const [sortingType, setSortingType] = useState<string>(sortingTypes[0]);
  const [pokemons, setPokemons] = usePokemonSort(sortingType);
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementNumberOfPokemonShown = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const resetNumberOfPokemonShown = () => setNumberOfPokemonShown(POKEMON_STACK_SIZE);

  const handleOptionSelectionChange = (e: BaseSyntheticEvent) => {
    setSortingType(e.target.value);
    resetNumberOfPokemonShown();
  };

  const getAllPokemons = () => {
    fetchAllPokemons().then(setPokemons);
  };

  useEffect(getAllPokemons, []);

  const getPokemonByType = (type: string) => {
    fetchPokemonsByType(type).then(setPokemons);
    resetNumberOfPokemonShown();
  };

  const callbackedGetPokemonByType = useCallback(getPokemonByType, []);

  const renderPokemon = (pokemon: IPokemon) => (
    <Pokemon key={pokemon.id} {...pokemon} onTypeClick={callbackedGetPokemonByType} />
  );

  const renderPokemons = () => pokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  return (
    <Page>
      <div className={styles.container}>
        <Dropdown options={sortingTypes} handleOptionSelectionChange={handleOptionSelectionChange} />
        <FlexboxList showMore={incrementNumberOfPokemonShown}>{renderPokemons()}</FlexboxList>
      </div>
    </Page>
  );
};

export default HomePage;
