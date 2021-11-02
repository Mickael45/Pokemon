import { useState } from "react";
import { getPokemonPrimaryTypeColor } from "../../../../utils/pokemonFormatter/pokemonFormatter";
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

  const renderDataTags = () => typeInteractions.map(renderDataTag);

  const color = getPokemonPrimaryTypeColor(type.split(",").reverse()[0]);

  const handleChange = () => setChecked(!checked);

  return (
    <div className={styles.container}>
      <label style={{ borderColor: color, background: color }} htmlFor={type}>
        {type.split(",").map(capitalizeFirstLetter).join(",")}
      </label>
      <input onChange={handleChange} id={type} type="checkbox" checked={checked} />
      <div>{renderDataTags()}</div>
    </div>
  );
};

export default TypeInteractionTableRow;
