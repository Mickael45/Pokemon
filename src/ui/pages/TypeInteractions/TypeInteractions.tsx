import Page from "../../templates/Page/Page";
import typeInteractionsData from "../../../constants/TypeInteractions.json";
import { convertEffectivenessStringToDamageRatio } from "../../../utils/pokemonTypes/convertors";
import TypeInteractionTableRow from "../../components/TypeInteractionsTable/TypeInteractionTableRow/TypeInteractionTableRow";
import styles from "./TypeInteractions.module.css";
import { memo } from "react";

type InteractionType = {
  type: PokemonType;
  typeInteractions: PokemonInteractionType[];
};

const convertHashMapToArray = (hashMap: IPokemonInteractionTypes) =>
  Object.entries(hashMap)[0] as [PokemonType, PokemonEffectivenessType];

const convertInteractionTypeHashMapToArray = (
  interactionTypesHashMap: IPokemonInteractionTypes[]
): PokemonInteractionType[] =>
  interactionTypesHashMap
    .map(convertHashMapToArray)
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
  const pokemonInteractionTypes = typeInteractionsData
    .flatMap((entry) => entry)
    .map(Object.values)
    .map(convertTypeInteractionArrayToObj);

  const renderTypeInteractionTable = (interactionType: InteractionType) => {
    const { type, typeInteractions } = interactionType;

    return <TypeInteractionTableRow key={type} type={type} typeInteractions={typeInteractions} />;
  };
  const renderTypeInteractionTables = () => pokemonInteractionTypes.map(renderTypeInteractionTable);

  return (
    <Page>
      <div className={styles.container}>{renderTypeInteractionTables()}</div>
    </Page>
  );
};

export default memo(TypeInteractionsPage);
