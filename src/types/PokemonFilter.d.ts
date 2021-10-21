type FilterField = "name" | "types";

type Filter = null | {
  name: string;
  field: FilterField;
};
