import Page from "../../templates/Page/Page";
import typeInteractionsData from "../../../constants/TypeInteractions.json";
import { convertEffectivenessStringToDamageRatio } from "../../../utils/pokemonTypes/convertors";
import TypeInteractionTableRow from "../../components/TypeInteractionsTable/TypeInteractionTableRow/TypeInteractionTableRow";
import styles from "./TypeInteractions.module.css";
import { memo } from "react";
import { ONE } from "../../../constants/DamageFactors";
import TypesSelector from "../../components/TypesSelector/TypesSelector";
import useQueryParams from "../../../hooks/useQueryParams";

type InteractionType = {
  type: PokemonType;
  typeInteractions: PokemonInteractionType[];
};

const convertHashMapToArray = (hashMap: IPokemonInteractionTypes) =>
  Object.entries(hashMap)[0] as [PokemonType, PokemonEffectivenessType];

const isInteractionsEffectivenessesDifferenThanOne = (values: [PokemonType, PokemonEffectivenessType]) =>
  convertEffectivenessStringToDamageRatio(values[1]) !== ONE;

const convertInteractionTypeHashMapToArray = (
  interactionTypesHashMap: IPokemonInteractionTypes[]
): PokemonInteractionType[] =>
  interactionTypesHashMap
    .map(convertHashMapToArray)
    .filter(isInteractionsEffectivenessesDifferenThanOne)
    .map((values: [PokemonType, PokemonEffectivenessType]) => ({
      type: values[0],
      effectiveness: convertEffectivenessStringToDamageRatio(values[1]),
    }))
    .sort((a, b) => b.effectiveness - a.effectiveness);

const convertTypeInteractionArrayToObj = (arr: any): InteractionType => ({
  type: arr[0],
  typeInteractions: convertInteractionTypeHashMapToArray(arr[1]),
});

const TypeInteractionsPage = () => {
  const filters = useQueryParams().map(({ value }) => value);

  const pokemonInteractionTypes = typeInteractionsData
    .flatMap((entry) => entry)
    .map(Object.values)
    .map(convertTypeInteractionArrayToObj);

  const renderTypeInteractionTable = (interactionType: InteractionType) => {
    const { type, typeInteractions } = interactionType;

    return <TypeInteractionTableRow key={type} type={type} typeInteractions={typeInteractions} />;
  };

  const filterByMonoType = (type: PokemonType) => type.includes(`${filters},`) || type === filters[0];

  const filterByMultiType = (type: PokemonType) => type.includes(filters.join(","));

  const isFilterIncludedInType = ({ type }: { type: PokemonType }) =>
    filters.length === 1 ? filterByMonoType(type) : filterByMultiType(type);

  const renderTypeInteractionTables = () =>
    filters.length === 0
      ? "Select"
      : pokemonInteractionTypes.filter(isFilterIncludedInType).map(renderTypeInteractionTable);

  return (
    <Page>
      <div className={styles.container}>
        <TypesSelector pathname="/type-interactions" />
        {renderTypeInteractionTables()}
      </div>
    </Page>
  );
};

export default memo(TypeInteractionsPage);
