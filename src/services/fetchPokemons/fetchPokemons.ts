import { formatToBasicPokemon, formatToFullPokemon, formatPokemonEvolutionChain } from "./formatter/pokemonFormatter";
import { extractPokemonName, extractPokemonData } from "./formatter/extractors";

const POKE_API_URL = "https://pokeapi.co/api/v2/";
const POKEMON_LIMIT = 2000;

const request = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();

  return jsonResponse;
};

const fetchPokemonByNameOrId = async (name: string) => await request(`${POKE_API_URL}pokemon/${name}`);

const fetchPokemonEvolutionChain = async (pokemonSpeciesData: any) => {
  const pokemonEvolutionData = await request(pokemonSpeciesData.evolution_chain.url);
  const pokemonEvolutionChain = formatPokemonEvolutionChain(pokemonEvolutionData.chain);
  const evolutionChainPokemonsDataPromises = pokemonEvolutionChain.map(fetchPokemonByNameOrId);
  const evolutionChainPokemonsData = await Promise.all<any>(evolutionChainPokemonsDataPromises);
  const formattedEvolutionChainPokemons = evolutionChainPokemonsData.map(formatToBasicPokemon);

  return formattedEvolutionChainPokemons;
};

export const fetchPokemonDetailsByNameOrId = async (id: string) => {
  const pokemonData = await fetchPokemonByNameOrId(id);
  const pokemonSpeciesData = await request(`${POKE_API_URL}pokemon-species/${id}`);
  const evolutionChainPokemons = await fetchPokemonEvolutionChain(pokemonSpeciesData);
  const formattedPokemon = formatToFullPokemon(pokemonData, evolutionChainPokemons, pokemonSpeciesData);

  return formattedPokemon;
};

export const fetchAllPokemons = async (): Promise<IBasicPokemon[]> => {
  const pokemonsData = await request(`${POKE_API_URL}pokemon?limit=${POKEMON_LIMIT}`);
  const pokemonsName = pokemonsData.results.map(extractPokemonName);
  const pokemonData = await Promise.all<any>(pokemonsName.map(fetchPokemonByNameOrId));
  const formattedPokemons = pokemonData.map(formatToBasicPokemon);

  return formattedPokemons;
};

export const fetchPokemonsByType = async (type: string): Promise<IBasicPokemon[]> => {
  const pokemonsData = await request(`${POKE_API_URL}type/${type}`);
  const pokemonsName = pokemonsData.pokemon.map(extractPokemonData).map(extractPokemonName);
  const pokemonData = await Promise.all<any>(pokemonsName.map(fetchPokemonByNameOrId));
  const formattedPokemons = pokemonData.map(formatToBasicPokemon);

  return formattedPokemons;
};
