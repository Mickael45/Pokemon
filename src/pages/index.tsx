import React, { useState, useContext, memo, useEffect } from "react";
import Head from "next/head";
import useFiltering from "../hooks/useFiltering";
import EmptyListPlaceholder from "../ui/components/EmptyListPlaceholder/EmptyListPlaceholder";
import ListSortingDropdown from "../ui/components/ListSortingDropdown/ListSortingDropdown";
import Pokemon from "../ui/components/Pokemon/Pokemon";
import ErrorScreenWrapper from "../ui/components/Wrappers/ErrorScreenWrapper/ErrorScreenWrapper";
import LoadingScreenWrapper from "../ui/components/Wrappers/LoadingScreenWrapper/LoadingScreenWrapper";
import FlexboxList from "../ui/templates/FlexboxList/FlexboxList";
import Page from "../ui/templates/Page/Page";
import styles from "./Home.module.css";
import { fetchAllPokemons } from "../services/fetchPokemons/fetchPokemons";
import LoadingContext from "../context/LoadingContext";
import PokemonContext from "../context/PokemonContext";

interface IProps {
  pokemons: IBasicPokemon[];
}

const POKEMON_STACK_SIZE = 12;

const HomePage = ({ pokemons }: IProps) => {
  const filteredPokemons = useFiltering();
  const { setPokemons } = useContext(PokemonContext);
  const { setLoading } = useContext(LoadingContext);
  const [numberOfPokemonShown, setNumberOfPokemonShown] = useState(POKEMON_STACK_SIZE);

  const incrementNumberOfPokemonShown = () => setNumberOfPokemonShown(numberOfPokemonShown + POKEMON_STACK_SIZE);

  const renderPokemon = (pokemon: IBasicPokemon) => <Pokemon key={pokemon.id} {...pokemon} />;

  const renderPokemons = () => filteredPokemons.slice(0, numberOfPokemonShown).map(renderPokemon);

  const renderSortDropdown = () => (filteredPokemons.length > 1 ? <ListSortingDropdown /> : <div />);

  const renderContent = () => {
    if (!filteredPokemons.length) {
      return <EmptyListPlaceholder text="No Pokemon Found..." />;
    }
    return (
      <>
        {renderSortDropdown()}
        <FlexboxList hasReachedEnd={areThereMorePokemonsToShow()} showMore={incrementNumberOfPokemonShown}>
          {renderPokemons()}
        </FlexboxList>
      </>
    );
  };

  const areThereMorePokemonsToShow = () => numberOfPokemonShown >= filteredPokemons.length;

  const updatePokemons = () => {
    if (pokemons) {
      setPokemons(pokemons);
      setLoading(false);
    }
  };

  useEffect(updatePokemons, [pokemons]);

  return (
    <>
      <Head>
        <title>Pokedex</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Use the Advanced Search to explore Pokémon by type, weakness, Ability, and more! Search for a Pokémon by name
          or using its National Pokédex number."
        />

        <link rel="preload" href="/fonts/pixelPokemonFont.ttf" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/hdPokemonFont.woff" as="font" crossOrigin="" />
        <link rel="preload" href="/fonts/hdPokemonFont-bold.woff" as="font" crossOrigin="" />
      </Head>
      <ErrorScreenWrapper>
        <LoadingScreenWrapper>
          <Page>
            <div className={styles.container}>{renderContent()}</div>
          </Page>
        </LoadingScreenWrapper>
      </ErrorScreenWrapper>
    </>
  );
};

export default memo(HomePage);

export async function getStaticProps() {
  const pokemons = await fetchAllPokemons();

  return { props: { pokemons } };
}
