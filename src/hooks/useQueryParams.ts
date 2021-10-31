import { useLocation } from "react-router-dom";

type QueryType = "types" | "id";

const getTypesFromQuery = (query: URLSearchParams) => {
  const name = query.get("types") as PokemonType;

  return name || "";
};

const getIdFromQuery = (query: URLSearchParams) => {
  const id = query.get("id");

  return id || "";
};

const queryTypeHashMap: { [key: string]: (query: URLSearchParams) => string } = {
  types: getTypesFromQuery,
  id: getIdFromQuery,
};

const useQueryParams = (type: QueryType): PokemonType | string => {
  const query = new URLSearchParams(useLocation().search);

  return queryTypeHashMap[type](query);
};

export default useQueryParams;
