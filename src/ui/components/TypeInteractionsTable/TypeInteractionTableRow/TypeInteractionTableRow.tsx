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
      <label htmlFor={type}>{type.split(",").map(capitalizeFirstLetter).join(",")} (Weaknesses)</label>
      <input id={type} type="checkbox" />
      <div>{renderDataTags()}</div>
    </div>
  );
};

export default TypeInteractionTableRow;
