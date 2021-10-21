import { memo } from "react";
import { getRandomTransformAnimation } from "../../animations";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../../utils";
import PokemonType from "../PokemonType/PokemonType";
import styles from "./Pokemon.module.css";

const Pokemon = ({ name, imageUrl, id, types }: IPokemon) => {
  const renderType = (type: string) => <PokemonType key={`${id}-${type}`} type={type} onClick={() => {}} />;
  const renderTypes = () => types.split(",").map(renderType);

  return (
    <div className={[styles.container, getRandomTransformAnimation()].join(" ")}>
      <img src={imageUrl} alt="pokemon pic" />
      <div>{`#${formatNumberToMatchLength(id)}`}</div>
      <h3>{capitalizeFirstLetter(name)}</h3>
      {renderTypes()}
    </div>
  );
};

export default memo(Pokemon);
