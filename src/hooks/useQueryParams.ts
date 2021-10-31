import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TYPES, ID, NAME, EMPTY } from "../constants/QueryTypes";

const queryTypes: QueryType[] = [TYPES, ID, NAME];
const EMPTY_QUERY_OBJ: QueryObj = { type: EMPTY, value: "" };

const getTypesFromQuery = (query: URLSearchParams): QueryObj => {
  const types = query.get(TYPES) as PokemonType;

  return types ? { type: TYPES, value: types } : EMPTY_QUERY_OBJ;
};

const getIdFromQuery = (query: URLSearchParams): QueryObj => {
  const id = query.get(ID);

  return id ? { type: ID, value: id } : EMPTY_QUERY_OBJ;
};

const getNameFromQuery = (query: URLSearchParams): QueryObj => {
  const name = query.get(NAME);

  return name ? { type: NAME, value: name } : EMPTY_QUERY_OBJ;
};

const queryTypeHashMap: { [key: string]: (query: URLSearchParams) => QueryObj } = {
  [TYPES]: getTypesFromQuery,
  [ID]: getIdFromQuery,
  [NAME]: getNameFromQuery,
};

const useQueryParams = (): Array<QueryObj> => {
  const [queryTypeObjs, setQueryTypesObjs] = useState<QueryObj[]>([]);
  const rawQuery = useLocation().search;
  const query = new URLSearchParams(rawQuery);

  const getQueryDataByQueryType = (queryType: QueryType) => queryTypeHashMap[queryType](query);

  const updateQueryTypesObjs = () => {
    setQueryTypesObjs(queryTypes.map(getQueryDataByQueryType).filter((data) => data !== EMPTY_QUERY_OBJ));
  };

  useEffect(updateQueryTypesObjs, [rawQuery]);

  return queryTypeObjs;
};

export const usePokemonTypesFromQuery = (): string => {
  const query = new URLSearchParams(useLocation().search);

  return (query.get(TYPES) as PokemonType) || "";
};

export default useQueryParams;
