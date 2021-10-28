import { useState, useEffect, useCallback, BaseSyntheticEvent, useContext } from "react";
import { fetchAllPokemons } from "../../../services/fetchPokemons/fetchPokemons";
import { sortingTypesMap } from "../../../hooks/usePokemonSort";
import Pokemon from "../../components/Pokemon/Pokemon";
import Dropdown from "../../components/Dropdown/Dropdown";
import Page from "../../templates/Page/Page";
import FlexboxList from "../../templates/FlexboxList/FlexboxList";
import usePokemonSort from "../../../hooks/usePokemonSort";
import styles from "./Home.module.css";
import useQueryParams from "../../../hooks/useQueryParams";
import { SOMETHING_WRONG_HAPPENED } from "../../../constants/Errors";
import LoadingScreenWrapper from "../../components/Wrappers/LoadingScreenWrapper/LoadingScreenWrapper";
import ErrorScreenWrapper from "../../components/Wrappers/ErrorScreenWrapper/ErrorScreenWrapper";
import ErrorContext from "../../../context/ErrorContext";
import LoadingContext from "../../../context/LoadingContext";
import { MAX_POKEMON_ID_ALLOWED } from "../../../constants/FetchPokemons";

const POKEMON_STACK_SIZE = 12;

const sortingTypes = Object.values(sortingTypesMap);

const HomePage = () => {
  const queryFilteringType = useQueryParams();
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
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

  const setLoadingAccordingly = () => {
    if (pokemons && pokemons.length > 0) {
      setLoading(false);
    }
  };

  const handleSearchButtonClick = () => {
    const input = document.getElementById("input") as HTMLInputElement;
    setLoading(true);

    if (input) {
      setFilteringType({ name: input.value.toLowerCase(), field: "name" });
    }
  };

  const updatePokemons = (pokemons: IBasicPokemon[]) => {
    setPokemons(pokemons);
    setLoading(false);
  };

  const setErrorToSomethingWrongHappened = () => {
    setError(SOMETHING_WRONG_HAPPENED);
  };

  const getAllPokemons = () => {
    setLoading(true);
    fetchAllPokemons().then(updatePokemons).catch(setErrorToSomethingWrongHappened);
  };

  useEffect(getAllPokemons, []);
  useEffect(setLoadingAccordingly, [pokemons]);

  const getPokemonByType = (type: string) => {
    setLoading(true);
    setFilteringType({ name: type, field: "types" });
    resetNumberOfPokemonShown();
  };

  const callbackedGetPokemonByType = useCallback(getPokemonByType, []);

  const renderPokemon = (pokemon: IBasicPokemon) => (
    <Pokemon key={pokemon.id} {...pokemon} onTypeClick={callbackedGetPokemonByType} />
  );

  const renderPokemons = () => pokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  const areThereMorePokemonsToShow = () => numberOfPokemonShown >= pokemons.length;

  return (
    <ErrorScreenWrapper>
      <LoadingScreenWrapper>
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
            <FlexboxList hasReachedEnd={areThereMorePokemonsToShow()} showMore={incrementNumberOfPokemonShown}>
              {renderPokemons()}
            </FlexboxList>
          </div>
        </Page>
      </LoadingScreenWrapper>
    </ErrorScreenWrapper>
  );
};

export default HomePage;
