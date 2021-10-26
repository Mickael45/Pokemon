import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import brokenNamesMap from "../brokenNameMap";
import {
  PokemonTypeData,
  PokemonType,
  PokemonStat,
  PokemonAbility,
  FlavorTextEntry,
  GeneraEntry,
  PokemonSpecie,
  IPokemonResponseType,
} from "./types";

const findEnglishEntry = (entry: FlavorTextEntry | GeneraEntry) => entry.language.name === "en";

const replaceBrokenName = (name: string) => brokenNamesMap[name] || name;

export const extractStatsFromPokemon = ({ stats }: IPokemonResponseType) => {
  const formatStatLabel = (statLabel: string) => capitalizeFirstLetter(statLabel.replaceAll("-", " "));
  const createStatObj = ({ base_stat, stat }: PokemonStat) => ({
    label: formatStatLabel(stat.name),
    value: base_stat,
  });

  return stats?.map(createStatObj);
};

export const extractAbilitiesFromPokemon = (abilities: PokemonAbility[]) => {
  const isAbilityVisible = (ability: PokemonAbility) => !ability.is_hidden;
  const formatAbilityName = ({ ability }: PokemonAbility) => capitalizeFirstLetter(ability.name.replaceAll("-", " "));

  return abilities.filter(isAbilityVisible).map(formatAbilityName);
};

export const extractTypeName = (type: PokemonType) => type.type.name;

export const extractPokemonName = ({ name }: IBasicPokemon) => replaceBrokenName(name);

export const extractPokemonDescription = (pokemonSpeciesData: PokemonSpecie) =>
  pokemonSpeciesData.flavor_text_entries.find(findEnglishEntry)?.flavor_text || "";

export const extractPokemonCategory = (pokemonSpeciesData: PokemonSpecie) =>
  pokemonSpeciesData.genera.find(findEnglishEntry)?.genus.replace("Pokémon", "") || "";

export const extractPokemonData = ({ pokemon }: PokemonTypeData) => pokemon;
