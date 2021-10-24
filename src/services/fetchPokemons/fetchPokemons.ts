import { extractPokemonName, extractPokemonData, formatToBasicPokemon, formatToFullPokemon } from "./pokemonFormatting";

const POKE_API_URL = "https://pokeapi.co/api/v2/";
const POKEMON_LIMIT = 2000;

const fetchPokemons = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();

  return jsonResponse;
};

const fetchPokemonByNameOrId = async (name: string) => await fetchPokemons(`${POKE_API_URL}pokemon/${name}`);

export const fetchPokemonDetailsByNameOrId = async (name: string) => {
  const pokemonData = await fetchPokemonByNameOrId(name);
  const formattedPokemon = formatToFullPokemon(pokemonData);

  return formattedPokemon;
};

export const fetchAllPokemons = async (): Promise<IBasicPokemon[]> => {
  const pokemonsData = await fetchPokemons(`${POKE_API_URL}pokemon?limit=${POKEMON_LIMIT}`);
  const pokemonsName = pokemonsData.results.map(extractPokemonName);
  const pokemonData = await Promise.all<any>(pokemonsName.map(fetchPokemonByNameOrId));
  const formattedPokemons = pokemonData.map(formatToBasicPokemon);

  return formattedPokemons;
};

export const fetchPokemonsByType = async (type: string): Promise<IBasicPokemon[]> => {
  const pokemonsData = await fetchPokemons(`${POKE_API_URL}type/${type}`);
  const pokemonsName = pokemonsData.pokemon.map(extractPokemonData).map(extractPokemonName);
  const pokemonData = await Promise.all<any>(pokemonsName.map(fetchPokemonByNameOrId));
  const formattedPokemons = pokemonData.map(formatToBasicPokemon);

  return formattedPokemons;
};
