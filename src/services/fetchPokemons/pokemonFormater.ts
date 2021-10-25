import brokenNamesMap from "./brokenNameMap";
import { formatNumberToMatchLength } from "../../utils";
import { capitalizeFirstLetter } from "../../utils/stringManipulation";
import typesInteractionData from "../../ui/pages/TypeInteractions/typeInteractions.json";
const POKEMON_PIC_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

type Type = {
  type: {
    name: string;
  };
};

type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

type PokemonType = {
  pokemon: {
    name: string;
  };
};

type Ability = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};
interface IPokemonResponseType {
  id: number;
  name: string;
  types: Type[];
  stats: Stat[];
  weight: number;
  height: number;
  abilities: Ability[];
}

const getPokemonWeaknesses = (types: string) => {
  const typeInteractions = typesInteractionData.flat().find(({ key }: IPokemonTypeInteraction) => key === types);
  const weakInteractionTypes = typeInteractions?.values
    .filter(
      (value: IPokemonInteractionType) =>
        Object.values(value)[0] === "very effective" || Object.values(value)[0] === "super effective"
    )
    .map((value: IPokemonInteractionType) => ({
      type: Object.keys(value)[0] as PokemonTypes,
      factor: (Object.values(value)[0] === "very effective" ? "2" : "4") as DamageFactor,
    }));

  return weakInteractionTypes || [];
};

const extractTypeName = (type: Type) => type.type.name;

const extractStatsFromPokemon = ({ stats }: IPokemonResponseType) =>
  stats?.map(({ base_stat, stat }: Stat) => ({
    label: capitalizeFirstLetter(stat.name.replaceAll("-", " ")),
    value: base_stat,
  }));

const extractAbilitiesFromPokemon = (abilities: Ability[]) =>
  abilities
    .filter((ability) => !ability.is_hidden)
    .map(({ ability }: Ability) => capitalizeFirstLetter(ability.name.replaceAll("-", " ")));

export const extractPokemonName = ({ name }: { name: string }) => replaceBrokenName(name);

export const extractPokemonData = ({ pokemon }: PokemonType) => pokemon;

export const replaceBrokenName = (name: string) => brokenNamesMap[name] || name;

export const formatToBasicPokemon = (pokemon: IPokemonResponseType): IBasicPokemon => {
  const { id, name, types } = pokemon;
  const imageUrl = `${POKEMON_PIC_URL}${formatNumberToMatchLength(id)}.png`;
  const typesName = types.map(extractTypeName).join(",");

  return { id, name, imageUrl, types: typesName };
};

export const formatToFullPokemon = (
  pokemon: IPokemonResponseType,
  evolutionChain: IBasicPokemon[],
  description: string
): IFullPokemon => {
  const { height, weight } = pokemon;
  const pokemonBasicInfo = formatToBasicPokemon(pokemon);
  const stats = extractStatsFromPokemon(pokemon);
  const abilities = extractAbilitiesFromPokemon(pokemon.abilities);
  const weaknesses = getPokemonWeaknesses(pokemonBasicInfo.types);

  return {
    ...pokemonBasicInfo,
    stats,
    weaknesses,
    height: height * 10,
    weight: weight / 10,
    evolutionChain,
    abilities,
    description,
  };
};
