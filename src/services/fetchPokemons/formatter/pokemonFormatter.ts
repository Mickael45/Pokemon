import { formatNumberToMatchLength } from "../../../utils";
import typesInteractionData from "../../../constants/TypeInteractions.json";
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
} from "../../../constants/EffectivenessTypes";
import { ZERO, QUARTER, HALF, ONE, TWO, FOUR } from "../../../constants/DamageFactors";

const POKEMON_PIC_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

type PokemonInteractionTypesToDamageFactorType = {
  [key in PokemonEffectivenessType]: DamageFactor;
};

const PokemonInteractionTypesToDamageFactorMap: PokemonInteractionTypesToDamageFactorType = {
  [NO_EFFECT]: ZERO,
  [NOT_EFFECTIVE_AT_ALL]: QUARTER,
  [NOT_VERY_EFFECTIVE]: HALF,
  [NORMAL_EFFECTIVENESS]: ONE,
  [VERY_EFFECTIVE]: TWO,
  [SUPER_EFFECTIVE]: FOUR,
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
  { evolves_to, species }: PokemonEvolutionData,
  evolutionChain: string[] = []
) => {
  evolutionChain.push(species.name);
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
