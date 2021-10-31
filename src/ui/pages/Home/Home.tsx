import { useState, useContext, useEffect } from "react";
import Pokemon from "../../components/Pokemon/Pokemon";
import Page from "../../templates/Page/Page";
import FlexboxList from "../../templates/FlexboxList/FlexboxList";
import styles from "./Home.module.css";
import LoadingScreenWrapper from "../../components/Wrappers/LoadingScreenWrapper/LoadingScreenWrapper";
import ErrorScreenWrapper from "../../components/Wrappers/ErrorScreenWrapper/ErrorScreenWrapper";
import PokemonContext from "../../../context/PokemonContext";
import useFiltering from "../../../hooks/useFiltering";

const POKEMON_STACK_SIZE = 12;

const HomePage = () => {
  const { getAllPokemons } = useContext(PokemonContext);
  const filteredPokemons = useFiltering();

  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementNumberOfPokemonShown = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const renderPokemon = (pokemon: IBasicPokemon) => <Pokemon key={pokemon.id} {...pokemon} />;

  const renderPokemons = () => filteredPokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  const areThereMorePokemonsToShow = () => numberOfPokemonShown >= filteredPokemons.length;

  useEffect(getAllPokemons, []);

  return (
    <ErrorScreenWrapper>
      <LoadingScreenWrapper>
        <Page>
          <div className={styles.container}>
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
