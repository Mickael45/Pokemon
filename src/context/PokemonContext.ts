import { createContext } from "react";

interface IContextProps {
  filteredPokemons: IBasicPokemon[];
  pokemons: IBasicPokemon[];
  setPokemons: (pokemons: IBasicPokemon[]) => void;
  getAllPokemons: () => void;
}

export default createContext<IContextProps>({
  filteredPokemons: [],
  pokemons: [],
  setPokemons: () => {},
  getAllPokemons: () => {},
});
