import { FormEvent, useContext } from "react";
import PokemonContext from "../../../context/PokemonContext";

const NAME_INPUT_ID = "nameInputId";

const ListFilteringInput = () => {
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemonByName = (value: string) => {
    const doValueAndPokemonNameMatchPartially = (pokemon: IBasicPokemon) => pokemon.name.includes(value);

    return pokemons.filter(doValueAndPokemonNameMatchPartially);
  };

  const handleButtonClick = () => {
    const input = document.getElementById(NAME_INPUT_ID) as HTMLInputElement;

    if (input && input.value) {
      console.log(input.value);
      const filteredPokemons = filterPokemonByName(input.value.toLocaleLowerCase());

      setPokemons(filteredPokemons);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleButtonClick();
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input id={NAME_INPUT_ID} />
      <button placeholder="search by name" onClick={handleButtonClick}>
        Search
      </button>
    </form>
  );
};

export default ListFilteringInput;
