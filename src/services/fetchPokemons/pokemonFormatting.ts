import brokenNamesMap from "./brokenNameMap";
import { formatNumberToMatchLength } from "../../utils";

const POKEMON_PIC_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";

interface IType {
  type: {
    name: string;
  };
}

interface IPokemonResponseType {
  id: number;
  name: string;
  types: IType[];
}

const extractTypeName = (type: IType) => type.type.name;

export const extractPokemonName = ({ name }: { name: string }) => replaceBrokenName(name);

export const replaceBrokenName = (name: string) => brokenNamesMap[name] || name;

export const formatPokemon = (pokemon: IPokemonResponseType): IPokemon => {
  const { id, name, types } = pokemon;
  const imageUrl = `${POKEMON_PIC_URL}${formatNumberToMatchLength(id)}.png`;
  const typesName = types.map(extractTypeName).join(",");

  return { id, name, imageUrl, types: typesName };
};
