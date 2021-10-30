import { ALL } from "../constants/FilteringTypes";
import { useLocation } from "react-router-dom";

const getTypesQueryParams = (name: PokemonType, field: FilterField) => (field ? name : ALL);

const getNameQueryParams = (name: PokemonType, field: FilterField) => (field ? name : "");

const useQueryParams = (filteringType: FilterField): FilteringType => {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name") as PokemonType;
  const field = query.get("field") as FilterField;

  return filteringType === "name" ? getNameQueryParams(name, field) : getTypesQueryParams(name, field);
};

export default useQueryParams;
