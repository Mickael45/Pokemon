import { useState, useEffect, useCallback, BaseSyntheticEvent } from "react";
import { useLocation } from "react-router-dom";
import { fetchAllPokemons } from "../../../services/fetchPokemons/fetchPokemons";
import { sortingTypesMap } from "../../../hooks/usePokemonSort";
import Pokemon from "../../components/Pokemon/Pokemon";
import Page from "../../templates/Page/Page";
import FlexboxList from "../../templates/FlexboxList/FlexboxList";
import Dropdown from "../../components/Dropdown/Dropdown";
import usePokemonSort from "../../../hooks/usePokemonSort";
import styles from "./Home.module.css";

const POKEMON_STACK_SIZE = 12;

const sortingTypes = Object.values(sortingTypesMap);

const useQueryParams = (): Filter => {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name");
  const field = query.get("field") as FilterField;

  return !name || !field
    ? null
    : {
        name,
        field,
      };
};

const HomePage = () => {
  const queryFilteringType = useQueryParams();
  const [sortingType, setSortingType] = useState<string>(sortingTypes[0]);
  const [filteringType, setFilteringType] = useState<Filter>(queryFilteringType);
  const [pokemons, setPokemons] = usePokemonSort(sortingType, filteringType);
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementNumberOfPokemonShown = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const resetNumberOfPokemonShown = () => setNumberOfPokemonShown(POKEMON_STACK_SIZE);

  const resetFilteringType = () => setFilteringType(null);

  const handleOptionSelectionChange = (e: BaseSyntheticEvent) => {
    setSortingType(e.target.value);
    resetNumberOfPokemonShown();
  };

  const handleSearchButtonClick = () => {
    const input = document.getElementById("input") as HTMLInputElement;

    if (input) {
      setFilteringType({ name: input.value.toLowerCase(), field: "name" });
    }
  };

  const getAllPokemons = () => {
    fetchAllPokemons().then(setPokemons);
  };

  useEffect(getAllPokemons, []);

  const getPokemonByType = (type: string) => {
    setFilteringType({ name: type, field: "types" });
    resetNumberOfPokemonShown();
  };

  const callbackedGetPokemonByType = useCallback(getPokemonByType, []);

  const renderPokemon = (pokemon: IBasicPokemon) => (
    <Pokemon key={pokemon.id} {...pokemon} onTypeClick={callbackedGetPokemonByType} />
  );

  const renderPokemons = () => pokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  return (
    <Page>
      <div className={styles.container}>
        <button onClick={resetFilteringType}>Show All types</button>
        <div>
          <input id="input" />
          <button placeholder="search by name" onClick={handleSearchButtonClick}>
            Search
          </button>
        </div>
        <Dropdown options={sortingTypes} handleOptionSelectionChange={handleOptionSelectionChange} />
        <FlexboxList showMore={incrementNumberOfPokemonShown}>{renderPokemons()}</FlexboxList>
      </div>
    </Page>
  );
};

export default HomePage;
