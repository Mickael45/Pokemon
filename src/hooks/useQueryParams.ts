import { useLocation } from "react-router-dom";

const useQueryParams = (): PokemonType | string => {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name") as PokemonType;
  const field = query.get("field") as FilterField;

  return field ? name : "";
};

export default useQueryParams;
