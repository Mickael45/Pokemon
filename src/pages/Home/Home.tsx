import { useState, useEffect } from "react";
import { fetchPokemonsByGeneration } from "../../services";

const HomePage = () => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const getFirstGenPokemon = () => {
    fetchPokemonsByGeneration("1").then(setPokemons);
  };

  useEffect(getFirstGenPokemon, []);

  return (
    <div>
      Home Page
      <div>{pokemons.map((pokemon) => pokemon.name)}</div>
    </div>
  );
};

export default HomePage;
