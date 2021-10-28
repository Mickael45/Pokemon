import { useLocation } from "react-router-dom";

const useQueryParams = (): Filter => {
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("name");
  const field = query.get("field") as FilterField;

  return !name || !field
    ? null
    : {
        name,
        field,
      };
};

export default useQueryParams;
