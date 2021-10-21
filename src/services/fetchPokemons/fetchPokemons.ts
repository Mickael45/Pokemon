import { extractPokemonName, formatPokemon } from "./pokemonFormatting";

const POKE_API_URL = "https://pokeapi.co/api/v2/";

const fetchPokemons = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();

  return jsonResponse;
};

export const fetchPokemonsByGeneration = async (generation: string): Promise<IPokemon[]> => {
  const generationData = await fetchPokemons(`${POKE_API_URL}generation/${generation}`);
  const generationPokemonNames = generationData.pokemon_species.map(extractPokemonName);

  return Promise.all(generationPokemonNames.map(fetchPokemonByName));
};

export const fetchPokemonByName = async (name: string): Promise<IPokemon> => {
  const pokemon = await fetchPokemons(`${POKE_API_URL}pokemon/${name}`);
  const formattedPokemon = formatPokemon(pokemon);

  return formattedPokemon;
};
