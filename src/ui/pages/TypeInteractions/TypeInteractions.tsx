import { memo } from "react";
import Page from "../../templates/Page/Page";
import typeInteractionsData from "../../../constants/TypeInteractions.json";
import TypeInteractionTile from "../../components/TypeInteractionTile/TypeInteractionTile";
import TypesSelector from "../../components/TypesSelector/TypesSelector";
import useQueryParams from "../../../hooks/useQueryParams";
import { convertTypeInteractionArrayToObj } from "../../../utils/pokemonTypes/convertors";
import styles from "./TypeInteractions.module.css";
import { filterByMonoType, filterByMultiType } from "../../../utils/pokemonTypes/filtering";
import EmptyListPlaceholder from "../../components/EmptyListPlaceholder/EmptyListPlaceholder";

const TypeInteractionsPage = () => {
  const filters = useQueryParams().map(({ value }) => value);

  const pokemonInteractionTypes = typeInteractionsData
    .flatMap((entry) => entry)
    .map(Object.values)
    .map(convertTypeInteractionArrayToObj);

  const renderTypeInteractionTable = (interactionType: InteractionType) => {
    const { type, typeInteractions } = interactionType;

    return <TypeInteractionTile key={type} type={type} typeInteractions={typeInteractions} />;
  };

  const isFilterIncludedInType = ({ type }: { type: PokemonType }) =>
    filters.length === 1 ? filterByMonoType(filters, type) : filterByMultiType(filters, type);

  const renderTypeInteractionTables = () => {
    if (filters.length === 0) {
      return <div className={styles.typeInteractions}>Select the type(s) you want to see the interactions for.</div>;
    }
    const typeInteractions = pokemonInteractionTypes.filter(isFilterIncludedInType).map(renderTypeInteractionTable);

    return typeInteractions.length === 0 ? (
      <EmptyListPlaceholder text="No interactions found for this type combination..." />
    ) : (
      <div className={styles.typeInteractions}>{typeInteractions}</div>
    );
  };

  return (
    <Page>
      <div className={styles.container}>
        <TypesSelector pathname="/type-interactions" />
        <div>{renderTypeInteractionTables()}</div>
      </div>
    </Page>
  );
};

export default memo(TypeInteractionsPage);
