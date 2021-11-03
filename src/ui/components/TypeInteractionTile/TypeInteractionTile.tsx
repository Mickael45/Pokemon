import { useState } from "react";
import { getPokemonPrimaryTypeColor } from "../../../utils/pokemonFormatter/pokemonFormatter";
import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import PokemonType from "../PokemonType/PokemonType";
import styles from "./TypeInteractionTile.module.css";
import { QUARTER, ZERO, HALF, ONE, FOUR, TWO } from "../../../constants/DamageFactors";

interface IProps {
  type: PokemonType;
  typeInteractions: PokemonInteractionType[];
}

const TypeInteractionTile = ({ type, typeInteractions }: IProps) => {
  const [checked, setChecked] = useState(false);
  const damageFactors = [FOUR, TWO, ONE, HALF, QUARTER, ZERO];

  const renderType = (interactionType: PokemonInteractionType) => {
    return <PokemonType key={type} type={interactionType.type} />;
  };

  const renderTypesCategory = (categoryTypeInteractions: PokemonInteractionType[], index: number) => {
    if (categoryTypeInteractions.length === 0) {
      return;
    }

    const types = categoryTypeInteractions.map(renderType);

    return (
      <div>
        {`x${damageFactors[index]} damage from:`}
        <div>{types}</div>
      </div>
    );
  };

  const filterTypeInteractionsByDamageFactor = (damageFactor: DamageFactor): PokemonInteractionType[] => {
    const doesEffectivenessMatchWithDamageFactor = ({ effectiveness }: PokemonInteractionType) =>
      effectiveness === damageFactor;

    return typeInteractions.filter(doesEffectivenessMatchWithDamageFactor);
  };

  const renderTypes = () => damageFactors.map(filterTypeInteractionsByDamageFactor).map(renderTypesCategory);

  const color = getPokemonPrimaryTypeColor(type.split(",").reverse()[0]);

  const handleChange = () => setChecked(!checked);

  return (
    <div className={styles.container}>
      <label style={{ borderColor: color, background: color }} htmlFor={type}>
        {type.split(",").map(capitalizeFirstLetter).join("/")}
      </label>
      <input onChange={handleChange} id={type} type="checkbox" checked={checked} />
      <div>{renderTypes()}</div>
    </div>
  );
};

export default TypeInteractionTile;
