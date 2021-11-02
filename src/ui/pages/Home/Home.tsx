import { useState, useContext, useEffect, memo } from "react";
import Pokemon from "../../components/Pokemon/Pokemon";
import Page from "../../templates/Page/Page";
import FlexboxList from "../../templates/FlexboxList/FlexboxList";
import styles from "./Home.module.css";
import ErrorScreenWrapper from "../../components/Wrappers/ErrorScreenWrapper/ErrorScreenWrapper";
import PokemonContext from "../../../context/PokemonContext";
import useFiltering from "../../../hooks/useFiltering";
import LoadingScreenWrapper from "../../components/Wrappers/LoadingScreenWrapper/LoadingScreenWrapper";
import ListSortingDropdown from "../../components/ListSortingDropdown/ListSortingDropdown";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder/EmptyListPlaceholder";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

const POKEMON_STACK_SIZE = 12;

const HomePage = () => {
  const { getAllPokemons } = useContext(PokemonContext);
  const filteredPokemons = useFiltering();
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementNumberOfPokemonShown = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const renderPokemon = (pokemon: IBasicPokemon) => <Pokemon key={pokemon.id} {...pokemon} />;

  const renderPokemons = () => filteredPokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  const renderContent = () => {
    if (!filteredPokemons.length) {
      return <EmptyListPlaceholder />;
    }
    return (
      <>
        <ListSortingDropdown />
        <FlexboxList hasReachedEnd={areThereMorePokemonsToShow()} showMore={incrementNumberOfPokemonShown}>
          {renderPokemons()}
        </FlexboxList>
      </>
    );
  };

  const areThereMorePokemonsToShow = () => numberOfPokemonShown >= filteredPokemons.length;

  useEffect(getAllPokemons, []);

  return (
    <ErrorScreenWrapper>
      <LoadingScreenWrapper>
        <div>
          <NavigationBar />
          <Page>
            <div className={styles.container}>{renderContent()}</div>
          </Page>
        </div>
      </LoadingScreenWrapper>
    </ErrorScreenWrapper>
  );
};

export default memo(HomePage);
