import { useLocation } from "react-router-dom";

const useQueryParams = (): FilteringType => {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name") as PokemonType;
  const field = query.get("field") as FilterField;

  return !name || !field
    ? null
    : {
        name,
        field,
      };
};

export default useQueryParams;
