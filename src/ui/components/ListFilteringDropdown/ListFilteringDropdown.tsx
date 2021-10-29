import { useContext, useEffect, useState } from "react";
import PokemonContext from "../../../context/PokemonContext";
import Dropdown from "../Dropdown/Dropdown";
import * as FilteringTypes from "../../../constants/FilteringTypes";
import useQueryParams from "../../../hooks/useQueryParams";

const filteringOptions = Object.values(FilteringTypes);

const ListFilteringDropdown = () => {
  let filteringQuery = useQueryParams();

  if (filteringQuery && filteringQuery.field === "types" && filteringOptions.includes(filteringQuery.name)) {
    filteringQuery = filteringQuery.name;
  } else {
    filteringQuery = null;
  }

  const [filteringType, setFilteringType] = useState<FilteringType>(filteringQuery || FilteringTypes.ALL);
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemonsByField = (type: FilteringType) => {
    const doestTypesContainType = (pokemon: IBasicPokemon) => pokemon.types.includes(type);
    const filteredPokemons = pokemons.filter(doestTypesContainType);

    return filteredPokemons;
  };

  const filterPokemons = (type: FilteringType) => {
    const filteredPokemons = type !== FilteringTypes.ALL ? filterPokemonsByField(type) : pokemons;

    setPokemons(filteredPokemons);
    setFilteringType(type);
  };

  const handleOptionSelectionChange = (type: FilteringType = filteringQuery) => {
    if (type === null) {
      return;
    }
    filterPokemons(type);
  };

  useEffect(handleOptionSelectionChange, [filteringQuery]);

  return (
    <Dropdown<FilteringType>
      selectedOption={filteringType}
      options={filteringOptions}
      handleOptionSelectionChange={handleOptionSelectionChange}
    />
  );
};

export default ListFilteringDropdown;
