import { FormEvent, useContext } from "react";
import PokemonContext from "../../../context/PokemonContext";
import searchIcon from "../../../assets/search.svg";
import styles from "./ListFilteringInput.module.css";

const NAME_INPUT_ID = "nameInputId";

const ListFilteringInput = () => {
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemonByName = (value: string) => {
    const doValueAndPokemonNameMatchPartially = (pokemon: IBasicPokemon) => pokemon.name.includes(value);

    return pokemons.filter(doValueAndPokemonNameMatchPartially);
  };

  const handleButtonClick = () => {
    const input = document.getElementById(NAME_INPUT_ID) as HTMLInputElement;

    if (input) {
      const filteredPokemons = input.value === "" ? pokemons : filterPokemonByName(input.value.toLocaleLowerCase());

      setPokemons(filteredPokemons);
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

export default ListFilteringInput;
