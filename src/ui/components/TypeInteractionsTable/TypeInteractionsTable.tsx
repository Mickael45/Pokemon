import TypeInteractionTableRow from "./TypeInteractionTableRow/TypeInteractionTableRow";
import TypeInteractionTableHeader from "./TypeInteractionTableHeader/TypeInteractionTableHeader";
import "./TypeInteractionsTable.module.css";
interface IProps {
  typeInteractions: IPokemonInteractionTypes[];
}

const TypeInteractionsTable = ({ typeInteractions }: IProps) => {
  const renderRow = ({ key, values }: IPokemonInteractionTypes) => (
    <TypeInteractionTableRow key={key} type={key} values={values} />
  );
  const renderRows = () => typeInteractions.map(renderRow);

  return (
    <table>
      <tbody>
        <TypeInteractionTableHeader />
        {renderRows()}
      </tbody>
    </table>
  );
};

export default TypeInteractionsTable;
