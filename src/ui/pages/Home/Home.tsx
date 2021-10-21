import { useState, useEffect, BaseSyntheticEvent } from "react";
import { Pokemon } from "../../components";
import { usePokemonSort } from "../../../hooks";
import { fetchAllPokemons, fetchPokemonsByType } from "../../../services";
import { Page, FlexboxList } from "../../templates";
import { sortingTypesMap } from "../../../hooks/usePokemonSort";
import styles from "./Home.module.css";

const POKEMON_STACK_SIZE = 12;

const sortingTypes = Object.values(sortingTypesMap);

const HomePage = () => {
  const [sortingType, setSortingType] = useState<string>(sortingTypes[0]);
  const [pokemons, setPokemons] = usePokemonSort(sortingType);
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementOffsetByPokemonStackSize = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const onSortingTypeChange = (e: BaseSyntheticEvent) => setSortingType(e.target.value);

  const getFirstGenPokemons = () => {
    fetchAllPokemons().then(setPokemons);
  };

  const getPokemonByType = (type: string) => fetchPokemonsByType(type).then(setPokemons);

  useEffect(getFirstGenPokemons, [setPokemons]);

  const showLoadMoreButton = numberOfPokemonShown < pokemons.length && pokemons.length > 0;

  const renderPokemon = (pokemon: IPokemon) => <Pokemon key={pokemon.id} {...pokemon} onTypeClick={getPokemonByType} />;

  const renderPokemons = () => pokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  const renderSortingType = (sortingType: string) => <option value={sortingType}>{sortingType}</option>;

  const renderOptions = () => sortingTypes.map(renderSortingType);

  return (
    <Page>
      <div className={styles.container}>
        <select onChange={onSortingTypeChange}>{renderOptions()}</select>
        <FlexboxList onClick={incrementOffsetByPokemonStackSize} showLoadMoreButton={showLoadMoreButton}>
          {renderPokemons()}
        </FlexboxList>
      </div>
    </Page>
  );
};

export default HomePage;
