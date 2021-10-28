import { useContext, useState } from "react";
import PokemonContext from "../../../context/PokemonContext";
import Dropdown from "../Dropdown/Dropdown";
import {
  NORMAL,
  FIRE,
  WATER,
  ELECTRIC,
  GRASS,
  ICE,
  FIGHTING,
  POISON,
  GROUND,
  FLYING,
  PSYCHIC,
  BUG,
  ROCK,
  GHOST,
  DRAGON,
  DARK,
  STEEL,
  FAIRY,
  ALL,
} from "../../../constants/FilteringTypes";

const filteringOptions = [
  ALL,
  NORMAL,
  FIRE,
  WATER,
  ELECTRIC,
  GRASS,
  ICE,
  FIGHTING,
  POISON,
  GROUND,
  FLYING,
  PSYCHIC,
  BUG,
  ROCK,
  GHOST,
  DRAGON,
  DARK,
  STEEL,
  FAIRY,
];

const ListFilteringDropdown = () => {
  const [filteringType, setFilteringType] = useState<FilteringType>(ALL);
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemonsByField = (type: FilteringType) => {
    const doestTypesContainType = (pokemon: IBasicPokemon) => pokemon.types.includes(type as unknown as string);

    return pokemons.filter(doestTypesContainType);
  };

  const handleOptionSelectionChange = (type: FilteringType) => {
    const filteredPokemons = type !== ALL ? filterPokemonsByField(type) : pokemons;

    setPokemons(filteredPokemons);
    setFilteringType(type);
  };

  return (
    <Dropdown<FilteringType>
      selectedOption={filteringType}
      options={filteringOptions}
      handleOptionSelectionChange={handleOptionSelectionChange}
    />
  );
};

export default ListFilteringDropdown;
