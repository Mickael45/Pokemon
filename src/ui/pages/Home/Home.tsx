import { useState, useEffect, useCallback, useContext } from "react";
import { fetchAllPokemons } from "../../../services/fetchPokemons/fetchPokemons";
import Pokemon from "../../components/Pokemon/Pokemon";
import Page from "../../templates/Page/Page";
import FlexboxList from "../../templates/FlexboxList/FlexboxList";
import styles from "./Home.module.css";
import { SOMETHING_WRONG_HAPPENED } from "../../../constants/Errors";
import LoadingScreenWrapper from "../../components/Wrappers/LoadingScreenWrapper/LoadingScreenWrapper";
import ErrorScreenWrapper from "../../components/Wrappers/ErrorScreenWrapper/ErrorScreenWrapper";
import ErrorContext from "../../../context/ErrorContext";
import LoadingContext from "../../../context/LoadingContext";
import ListManipulationBar from "../../components/LIstManipulationBar/ListManipulationBar";
import PokemonContext from "../../../context/PokemonContext";

const POKEMON_STACK_SIZE = 12;

const HomePage = () => {
  const { setLoading } = useContext(LoadingContext);
  const { setError } = useContext(ErrorContext);
  const { pokemons, setPokemons } = useContext(PokemonContext);
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementNumberOfPokemonShown = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const resetNumberOfPokemonShown = () => setNumberOfPokemonShown(POKEMON_STACK_SIZE);

  const setLoadingAccordingly = () => {
    if (pokemons && pokemons.length > 0) {
      setLoading(false);
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
            <ListManipulationBar />
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
