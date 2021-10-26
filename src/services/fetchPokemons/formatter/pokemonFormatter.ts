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
import {
  NO_EFFECT,
  NOT_EFFECTIVE_AT_ALL,
  NOT_VERY_EFFECTIVE,
  NORMAL_EFFECTIVENESS,
  VERY_EFFECTIVE,
  SUPER_EFFECTIVE,
} from "../../../constants/PokemonTypesEffectiveness";
const POKEMON_PIC_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

type PokemonInteractionTypesToDamageFactorType = {
  [key in PokemonEffectivenessType]: DamageFactor;
};

const PokemonInteractionTypesToDamageFactorMap: PokemonInteractionTypesToDamageFactorType = {
  [NO_EFFECT]: "0",
  [NOT_EFFECTIVE_AT_ALL]: "0.25",
  [NOT_VERY_EFFECTIVE]: "1",
  [NORMAL_EFFECTIVENESS]: "0.5",
  [VERY_EFFECTIVE]: "1",
  [SUPER_EFFECTIVE]: "2",
};

const isVeryOrSuperEffectiveTypes = (value: PokemonInteractionType) => {
  const firstValue = Object.values(value)[0] as PokemonEffectivenessType;

  return firstValue === "very effective" || firstValue === "super effective";
};

const createWeaknessInteractionTypeObj = (value: any) => {
  const type = Object.keys(value)[0] as PokemonType;
  const interactionType = Object.values(value)[0] as PokemonEffectivenessType;
  const factor = PokemonInteractionTypesToDamageFactorMap[interactionType];

  return { type, factor };
};

const getPokemonWeaknesses = (types: string) => {
  const areTypesEqual = ({ key }: IPokemonInteractionTypes) => key === types;

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
