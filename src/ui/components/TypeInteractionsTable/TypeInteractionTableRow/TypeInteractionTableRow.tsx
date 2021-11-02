import { capitalizeFirstLetter } from "../../../../utils/stringManipulation";
import PokemonType from "../../PokemonType/PokemonType";
import styles from "./TypeInteractionTableRow.module.css";

interface IProps {
  type: PokemonType;
  typeInteractions: PokemonInteractionType[];
}

const TypeInteractionTableRow = ({ type, typeInteractions }: IProps) => {
  const renderDataTag = ({ type, effectiveness }: any) => (
    <PokemonType key={type} type={type}>{` (x${effectiveness})`}</PokemonType>
  );

  const renderDataTags = () => typeInteractions.map(renderDataTag);

  return (
    <div className={styles.container}>
      <h3>{type.split(",").map(capitalizeFirstLetter).join(",")} (Weaknesses)</h3>
      <div>{renderDataTags()}</div>
    </div>
  );
};

export default TypeInteractionTableRow;
