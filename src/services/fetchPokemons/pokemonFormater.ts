import brokenNamesMap from "./brokenNameMap";
import { formatNumberToMatchLength } from "../../utils";
import { capitalizeFirstLetter } from "../../utils/stringManipulation";
import typesInteractionData from "../../ui/pages/TypeInteractions/typeInteractions.json";
const POKEMON_PIC_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

interface IType {
  type: {
    name: string;
  };
}

interface IStat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface IPokemonType {
  pokemon: {
    name: string;
  };
}
interface IPokemonResponseType {
  id: number;
  name: string;
  types: IType[];
  stats: IStat[];
}

const getPokemonWeaknesses = (types: string) => {
  const typeInteractions = typesInteractionData.flat().find(({ key }: IPokemonTypeInteraction) => key === types);
  const weakInteractionTypes = typeInteractions?.values.filter(
    (value: IPokemonInteractionType) =>
      Object.values(value)[0] === "very effective" || Object.values(value)[0] === "super effective"
  );
  const weakTypesName = weakInteractionTypes
    ? weakInteractionTypes.map((interactionType) => Object.keys(interactionType)[0]).join(",")
    : "";
  console.log(typeInteractions, weakInteractionTypes, weakTypesName);

  return weakTypesName;
};

const extractTypeName = (type: IType) => type.type.name;

const extractStatsFromPokemon = ({ stats }: IPokemonResponseType) =>
  stats?.map(({ base_stat, stat }: IStat) => ({
    label: capitalizeFirstLetter(stat.name.replaceAll("-", " ")),
    value: base_stat,
  }));

export const extractPokemonName = ({ name }: { name: string }) => replaceBrokenName(name);

export const extractPokemonData = ({ pokemon }: IPokemonType) => pokemon;

export const replaceBrokenName = (name: string) => brokenNamesMap[name] || name;

export const formatToBasicPokemon = (pokemon: IPokemonResponseType): IBasicPokemon => {
  const { id, name, types } = pokemon;
  const imageUrl = `${POKEMON_PIC_URL}${formatNumberToMatchLength(id)}.png`;
  const typesName = types.map(extractTypeName).join(",");

  return { id, name, imageUrl, types: typesName };
};

export const formatToFullPokemon = (pokemon: IPokemonResponseType): IFullPokemon => {
  const pokemonBasicInfo = formatToBasicPokemon(pokemon);
  const stats = extractStatsFromPokemon(pokemon);
  const weaknesses = getPokemonWeaknesses(pokemonBasicInfo.types);

  return { ...pokemonBasicInfo, stats, weaknesses };
};
