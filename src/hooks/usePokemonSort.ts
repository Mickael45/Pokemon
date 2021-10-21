import { useState, useEffect } from "react";
import { sortByNumberFieldAsc, sortByNumberFieldDesc, sortByStringFieldAsc, sortByStringFieldDesc } from "../utils";

type FormattingFunction = (array: IPokemon[]) => IPokemon[];

export const sortingTypesMap = {
  ASCENDING_ID: "asc. number",
  DESCENDING_ID: "desc. number",
  ASCENDING_NAME: "A-Z",
  DESCENDING_NAME: "Z-A",
};

const { ASCENDING_ID, DESCENDING_ID, ASCENDING_NAME, DESCENDING_NAME } = sortingTypesMap;

const sortingMap: { [key: string]: FormattingFunction } = {
  [ASCENDING_ID]: (pokemons: IPokemon[]) => sortByNumberFieldAsc(pokemons, "id"),
  [DESCENDING_ID]: (pokemons: IPokemon[]) => sortByNumberFieldDesc(pokemons, "id"),
  [ASCENDING_NAME]: (pokemons: IPokemon[]) => sortByStringFieldAsc(pokemons, "name"),
  [DESCENDING_NAME]: (pokemons: IPokemon[]) => sortByStringFieldDesc(pokemons, "name"),
};

const MAX_ID_ALLOWED = 900;

const pickFirst900Pokemons = (pokemons: IPokemon[]) => pokemons.filter(({ id }: IPokemon) => id < MAX_ID_ALLOWED);

const usePokemonSort = (sortingType: string, filterType: Filter): [IPokemon[], (pokemons: IPokemon[]) => void] => {
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);
  const [manipulatedPokemons, setManipulatedPokemons] = useState<IPokemon[]>([]);

  const updatePokemons = (newPokemon: IPokemon[]) => setPokemons(pickFirst900Pokemons(newPokemon));

  const updateManipulatedPokemons = () => setManipulatedPokemons(pokemons);

  const sortPokemons = () => updatePokemons(sortingMap[sortingType](pokemons));

  const filterPokemonsByType = (field: FilterField, name: string) =>
    pokemons.filter((pokemon: IPokemon) => pokemon[field].includes(name));

  const filterPokemons = () => {
    const newPokemonsList = filterType ? filterPokemonsByType(filterType.field, filterType.name) : pokemons;

    setManipulatedPokemons(newPokemonsList);
  };

  useEffect(sortPokemons, [sortingType]);

  useEffect(filterPokemons, [filterType]);

  useEffect(updateManipulatedPokemons, [pokemons]);

  return [manipulatedPokemons, updatePokemons];
};

export default usePokemonSort;
