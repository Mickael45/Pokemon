import { extractPokemonName, formatPokemon } from "./pokemonFormatting";

type PokemonType = {
  pokemon: {
    name: string;
  };
};

const POKE_API_URL = "https://pokeapi.co/api/v2/";
const POKEMON_LIMIT = 2000;

const fetchPokemons = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();

  return jsonResponse;
};

export const fetchPokemonByNameOrId = async (name: string): Promise<IPokemon> => {
  const pokemon = await fetchPokemons(`${POKE_API_URL}pokemon/${name}`);
  const formattedPokemon = formatPokemon(pokemon);

  return formattedPokemon;
};

export const fetchAllPokemons = async (): Promise<IPokemon[]> => {
  const pokemonsData = await fetchPokemons(`${POKE_API_URL}pokemon?limit=${POKEMON_LIMIT}`);
  const pokemonsName = pokemonsData.results.map(extractPokemonName);

  return Promise.all(pokemonsName.map(fetchPokemonByNameOrId));
};

export const fetchPokemonsByType = async (type: string): Promise<IPokemon[]> => {
  const pokemonsData = await fetchPokemons(`${POKE_API_URL}type/${type}`);
  const pokemonsName = pokemonsData.pokemon.map(({ pokemon }: PokemonType) => pokemon).map(extractPokemonName);

  return Promise.all(pokemonsName.map(fetchPokemonByNameOrId));
};
