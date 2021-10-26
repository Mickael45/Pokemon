import { useState, useEffect } from "react";
import {
  sortByNumberFieldAsc,
  sortByNumberFieldDesc,
  sortByStringFieldAsc,
  sortByStringFieldDesc,
} from "../utils/arraySorting";

type FormattingFunction = (array: IBasicPokemon[]) => IBasicPokemon[];

type UpdatePokemonFunction = (pokemons: IBasicPokemon[]) => void;

export const sortingTypesMap = {
  ASCENDING_ID: "asc. number",
  DESCENDING_ID: "desc. number",
  ASCENDING_NAME: "A-Z",
  DESCENDING_NAME: "Z-A",
};

const { ASCENDING_ID, DESCENDING_ID, ASCENDING_NAME, DESCENDING_NAME } = sortingTypesMap;

const sortingMap: { [key: string]: FormattingFunction } = {
  [ASCENDING_ID]: (pokemons: IBasicPokemon[]) => sortByNumberFieldAsc(pokemons, "id"),
  [DESCENDING_ID]: (pokemons: IBasicPokemon[]) => sortByNumberFieldDesc(pokemons, "id"),
  [ASCENDING_NAME]: (pokemons: IBasicPokemon[]) => sortByStringFieldAsc(pokemons, "name"),
  [DESCENDING_NAME]: (pokemons: IBasicPokemon[]) => sortByStringFieldDesc(pokemons, "name"),
};

const MAX_ID_ALLOWED = 900;

const pickFirst900Pokemons = (pokemons: IBasicPokemon[]) =>
  pokemons.filter(({ id }: IBasicPokemon) => id < MAX_ID_ALLOWED);

const usePokemonSort = (
  sortingType: string,
  filteringType: Filter
): [IBasicPokemon[], (pokemons: IBasicPokemon[]) => void] => {
  const [pokemons, setPokemons] = useState<IBasicPokemon[]>([]);
  const [manipulatedPokemons, setManipulatedPokemons] = useState<IBasicPokemon[]>([]);

  const updatePokemons = (newPokemon: IBasicPokemon[]) => setPokemons(pickFirst900Pokemons(newPokemon));
  const updateManipulatedPokemons = (newPokemons: IBasicPokemon[] = pokemons) => setManipulatedPokemons(newPokemons);

  const sortPokemonCallback = () => sortPokemons(sortingType, pokemons, updatePokemons);
  const filterPokemonCallback = () => filterPokemons(filteringType, pokemons, updateManipulatedPokemons);

  useEffect(sortPokemonCallback, [sortingType]);
  useEffect(filterPokemonCallback, [filteringType, pokemons]);

  return [manipulatedPokemons, updatePokemons];
};

const sortPokemons = (sortingType: string, pokemons: IBasicPokemon[], updatePokemons: UpdatePokemonFunction) => {
  updatePokemons(sortingMap[sortingType](pokemons));
};

const filterPokemons = (filteringType: Filter, pokemons: IBasicPokemon[], updatePokemons: UpdatePokemonFunction) => {
  const filterPokemonsByField = (field: FilterField, name: string) =>
    pokemons.filter((pokemon: IBasicPokemon) => pokemon[field].includes(name));
  const filteredPokemons = filteringType ? filterPokemonsByField(filteringType.field, filteringType.name) : pokemons;

  updatePokemons(filteredPokemons);
};

export default usePokemonSort;
