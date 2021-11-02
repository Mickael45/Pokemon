import { useState } from "react";
import { capitalizeFirstLetter } from "../../../../utils/stringManipulation";
import PokemonType from "../../PokemonType/PokemonType";
import styles from "./TypeInteractionTableRow.module.css";

interface IProps {
  type: PokemonType;
  typeInteractions: PokemonInteractionType[];
}

const TypeInteractionTableRow = ({ type, typeInteractions }: IProps) => {
  const [checked, setChecked] = useState(false);

  const renderDataTag = ({ type, effectiveness }: any) => (
    <PokemonType key={type} type={type}>{` (x${effectiveness})`}</PokemonType>
  );

  const renderDataTags = () => (checked ? typeInteractions.map(renderDataTag) : null);

  const handleChange = () => setChecked(!checked);

  return (
    <div className={styles.container}>
      <label htmlFor={type}>{type.split(",").map(capitalizeFirstLetter).join(",")} (Weaknesses)</label>
      <input onChange={handleChange} id={type} type="checkbox" checked={checked} />
      <div>{renderDataTags()}</div>
    </div>
  );
};

export default TypeInteractionTableRow;
