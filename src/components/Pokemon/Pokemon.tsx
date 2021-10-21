import { memo } from "react";
import { getRandomTransformAnimation } from "../../animations";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../utils";
import styles from "./Pokemon.module.css";

const Pokemon = ({ name, imageUrl, id, types }: IPokemon) => {
  const renderType = (type: string) => (
    <span key={`${id}-${type}`} data-type={type}>
      {capitalizeFirstLetter(type)}
    </span>
  );
  const renderTypes = () => types.split(",").map(renderType);
  const transformAnimation = getRandomTransformAnimation();

  return (
    <div className={[styles.container, transformAnimation].join(" ")}>
      <img src={imageUrl} alt="pokemon pic" />
      <div>{`#${formatNumberToMatchLength(id)}`}</div>
      <h3>{capitalizeFirstLetter(name)}</h3>
      {renderTypes()}
    </div>
  );
};

export default memo(Pokemon);
