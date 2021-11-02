import { memo } from "react";
import Page from "../../templates/Page/Page";
import typeInteractionsData from "../../../constants/TypeInteractions.json";
import TypeInteractionTile from "../../components/TypeInteractionTile/TypeInteractionTile";
import TypesSelector from "../../components/TypesSelector/TypesSelector";
import useQueryParams from "../../../hooks/useQueryParams";
import { convertTypeInteractionArrayToObj } from "../../../utils/pokemonTypes/convertors";
import styles from "./TypeInteractions.module.css";
import { filterByMonoType, filterByMultiType } from "../../../utils/pokemonTypes/filtering";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

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

  const renderTypeInteractionTables = () =>
    filters.length === 0
      ? "Select"
      : pokemonInteractionTypes.filter(isFilterIncludedInType).map(renderTypeInteractionTable);

  return (
    <>
      <NavigationBar />
      <Page>
        <div className={styles.container}>
          <TypesSelector pathname="/type-interactions" />
          {renderTypeInteractionTables()}
        </div>
      </Page>
    </>
  );
};

export default memo(TypeInteractionsPage);
