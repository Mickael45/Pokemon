import { extractPokemonName, extractPokemonData, formatToBasicPokemon, formatToFullPokemon } from "./pokemonFormater";

const POKE_API_URL = "https://pokeapi.co/api/v2/";
const POKEMON_LIMIT = 2000;

const request = async (url: string) => {
  const response = await fetch(url);
  const jsonResponse = await response.json();

  return jsonResponse;
};

const fetchPokemonByNameOrId = async (name: string) => await request(`${POKE_API_URL}pokemon/${name}`);

const getPokemonEvolutionChain = ({ evolves_to, species }: any, evolutionChain: any[] = []): any => {
  evolutionChain.push({
    name: species.name,
  });

  evolves_to.forEach((evolution: any) => getPokemonEvolutionChain(evolution, evolutionChain));

  return evolutionChain;
};

const fetchPokemonEvolutionChain = async (id: string) => {
  const pokemonSpeciesData = await request(`${POKE_API_URL}pokemon-species/${id}`);
  const pokemonEvolutionData = await request(pokemonSpeciesData.evolution_chain.url);
  const pokemonEvolutionChain = getPokemonEvolutionChain(pokemonEvolutionData.chain);
  const evolutionChainPokemonsData = await Promise.all<any>(
    pokemonEvolutionChain.map((evolutionData: any) => evolutionData.name).map(fetchPokemonByNameOrId)
  );
  const formattedEvolutionChainPokemons = evolutionChainPokemonsData.map(formatToBasicPokemon);

  return formattedEvolutionChainPokemons;
};

export const fetchPokemonDetailsByNameOrId = async (id: string) => {
  const pokemonData = await fetchPokemonByNameOrId(id);
  const evolutionChainPokemons = await fetchPokemonEvolutionChain(id);
  const formattedPokemon = formatToFullPokemon(pokemonData, evolutionChainPokemons);

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
