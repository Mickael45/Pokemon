import { TypeInteractionsTable } from "../../components";
import { Page } from "../../templates";
import typeInteractionsData from "../../../constants/TypeInteractions.json";

const TypeInteractionsPage = () => {
  const renderTypeInteractionTable = (typeInteractions: IPokemonInteractionTypes[], index: number) => (
    <TypeInteractionsTable key={index} typeInteractions={typeInteractions} />
  );

  const renderTypeInteractionTables = () => typeInteractionsData.map(renderTypeInteractionTable);

  return (
    <Page>
      <>{renderTypeInteractionTables()}</>
    </Page>
  );
};

export default TypeInteractionsPage;
