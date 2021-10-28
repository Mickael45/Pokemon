import { createContext } from "react";

interface IContextProps {
  pokemons: IBasicPokemon[];
  setPokemons: (pokemons: IBasicPokemon[]) => void;
}

export default createContext<IContextProps>({
  pokemons: [],
  setPokemons: () => {},
});
