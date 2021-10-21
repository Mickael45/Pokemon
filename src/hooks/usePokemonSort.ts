import { useState, useEffect } from "react";
import { sortByNumberFieldAsc, sortByNumberFieldDesc, sortByStringFieldAsc, sortByStringFieldDesc } from "../utils";

export const sortingTypesMap = {
  ASCENDING_ID: "asc. number",
  DESCENDING_ID: "desc. number",
  ASCENDING_NAME: "A-Z",
  DESCENDING_NAME: "Z-A",
};

const { ASCENDING_ID, DESCENDING_ID, ASCENDING_NAME, DESCENDING_NAME } = sortingTypesMap;

type SortingFunction = (array: IPokemon[]) => IPokemon[];

const sortingMap: { [key: string]: SortingFunction } = {
  [ASCENDING_ID]: (pokemons: IPokemon[]) => sortByNumberFieldAsc(pokemons, "id"),
  [DESCENDING_ID]: (pokemons: IPokemon[]) => sortByNumberFieldDesc(pokemons, "id"),
  [ASCENDING_NAME]: (pokemons: IPokemon[]) => sortByStringFieldAsc(pokemons, "name"),
  [DESCENDING_NAME]: (pokemons: IPokemon[]) => sortByStringFieldDesc(pokemons, "name"),
};

const MAX_ID_ALLOWED = 900;

const filterPokemons = (pokemons: IPokemon[]) => pokemons.filter(({ id }: IPokemon) => id < MAX_ID_ALLOWED);

const usePokemonSort = (sortingType: string): [IPokemon[], React.Dispatch<React.SetStateAction<IPokemon[]>>] => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const sortPokemon = () => setPokemons(sortingMap[sortingType](filterPokemons(pokemons)));

  useEffect(sortPokemon, [sortingType]);

  return [pokemons, setPokemons];
};

export default usePokemonSort;
