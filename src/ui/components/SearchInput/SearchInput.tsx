import { FormEvent, useContext } from "react";
import { filteredPokemonsById, filterPokemonByName } from "../../../utils/pokemonTypes/filtering";
import PokemonContext from "../../../context/PokemonContext";
import searchIcon from "../../../assets/search.svg";
import styles from "./SearchInput.module.css";

const NAME_INPUT_ID = "nameInputId";

const SearchInput = () => {
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemons = (input: HTMLInputElement) => {
    const { value } = input;

    return !isNaN(+value)
      ? filteredPokemonsById(pokemons, +value)
      : filterPokemonByName(pokemons, value.toLocaleLowerCase());
  };

  const handleButtonClick = () => {
    const input = document.getElementById(NAME_INPUT_ID) as HTMLInputElement;

    if (input) {
      setPokemons(filterPokemons(input));
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleButtonClick();
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <div>
        <input autoComplete="off" placeholder="Search a Pokemon by name or id" id={NAME_INPUT_ID} />
        <img src={searchIcon} onClick={handleButtonClick} alt="searchIcon" />
      </div>
    </form>
  );
};

export default SearchInput;
