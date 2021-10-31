import { FormEvent, useContext, useEffect } from "react";
import { filteredPokemonsById, filterPokemonByName } from "../../../utils/pokemonTypes/filtering";
import { useHistory } from "react-router-dom";
import PokemonContext from "../../../context/PokemonContext";
import searchIcon from "../../../assets/search.svg";
import styles from "./SearchInput.module.css";
import useQueryParams from "../../../hooks/useQueryParams";
import { getElementById } from "../../../utils/domManipulation";

const NAME_INPUT_ID = "nameInputId";

const SearchInput = () => {
  const filteringQuery = useQueryParams("id");
  const history = useHistory();
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemons = (input: HTMLInputElement) => {
    const { value } = input;

    if (value === "") {
      return pokemons;
    }

    return !isNaN(+value)
      ? filteredPokemonsById(pokemons, +value)
      : filterPokemonByName(pokemons, value.toLocaleLowerCase());
  };

  const handlePokemonsAndFilteringQueryChange = () => {
    const input = getElementById(NAME_INPUT_ID) as HTMLInputElement;

    if (!pokemons || !pokemons.length || !input) {
      return;
    }

    setPokemons(filterPokemons(input));
  };

  useEffect(handlePokemonsAndFilteringQueryChange, [filteringQuery, pokemons]);

  const createQuery = () => {
    const { value = "" } = getElementById(NAME_INPUT_ID) as HTMLInputElement;
    const search = value === "" ? "" : `id=${value}`;

    history.push({
      pathname: "/",
      search,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createQuery();
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <div>
        <input autoComplete="off" placeholder="Search a Pokemon by name or id" id={NAME_INPUT_ID} />
        <img src={searchIcon} onClick={createQuery} alt="searchIcon" />
      </div>
    </form>
  );
};

export default SearchInput;
