import { formatNumberToMatchLength } from "../../../utils";
import typesInteractionData from "../../../ui/pages/TypeInteractions/typeInteractions.json";
import { PokemonEvolutionData, PokemonSpecie, IPokemonResponseType } from "./types";
import {
  extractStatsFromPokemon,
  extractAbilitiesFromPokemon,
  extractPokemonDescription,
  extractPokemonCategory,
  extractTypeName,
} from "./extractors";

const POKEMON_PIC_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

type PokemonInteractionTypesToDamageFactorType = {
  [key in PokemonInteractionTypes]: DamageFactor;
};

const PokemonInteractionTypesToDamageFactorMap: PokemonInteractionTypesToDamageFactorType = {
  "no effect": "0",
  "not effective at all": "0.25",
  "not very effective": "1",
  "normal effectiveness": "0.5",
  "very effective": "1",
  "super effective": "2",
};

const isVeryOrSuperEffectiveTypes = (value: IPokemonInteractionType) => {
  const firstValue = Object.values(value)[0];

  return firstValue === "very effective" || firstValue === "super effective";
};

const createWeaknessInteractionTypeObj = (value: IPokemonInteractionType) => {
  const type = Object.keys(value)[0] as PokemonTypes;
  const interactionType = Object.values(value)[0] as PokemonInteractionTypes;
  const factor = PokemonInteractionTypesToDamageFactorMap[interactionType];

  return { type, factor };
};

const getPokemonWeaknesses = (types: string) => {
  const areTypesEqual = ({ key }: IPokemonTypeInteraction) => key === types;

  const typeInteractions = typesInteractionData.flat().find(areTypesEqual);
  const weakInteractionTypes = typeInteractions?.values
    .filter(isVeryOrSuperEffectiveTypes)
    .map(createWeaknessInteractionTypeObj);

  return weakInteractionTypes || [];
};

export const formatPokemonEvolutionChain = (
  { evolves_to, specie }: PokemonEvolutionData,
  evolutionChain: string[] = []
) => {
  evolutionChain.push(specie.name);
  evolves_to.forEach((evolution: any) => formatPokemonEvolutionChain(evolution, evolutionChain));

  return evolutionChain;
};

export const formatToBasicPokemon = (pokemon: IPokemonResponseType): IBasicPokemon => {
  const { id, name, types } = pokemon;
  const imageUrl = `${POKEMON_PIC_URL}${formatNumberToMatchLength(id)}.png`;
  const typesName = types.map(extractTypeName).join(",");

  return { id, name, imageUrl, types: typesName };
};

export const formatToFullPokemon = (
  pokemon: IPokemonResponseType,
  evolutionChain: IBasicPokemon[],
  pokemonSpeciesData: PokemonSpecie
): IFullPokemon => {
  const { height, weight } = pokemon;
  const pokemonBasicInfo = formatToBasicPokemon(pokemon);
  const weaknesses = getPokemonWeaknesses(pokemonBasicInfo.types);
  const stats = extractStatsFromPokemon(pokemon);
  const description = extractPokemonDescription(pokemonSpeciesData);
  const category = extractPokemonCategory(pokemonSpeciesData);
  const abilities = extractAbilitiesFromPokemon(pokemon.abilities);

  return {
    ...pokemonBasicInfo,
    stats,
    weaknesses,
    height: height * 10,
    weight: weight / 10,
    evolutionChain,
    abilities,
    description,
    category,
  };
};
