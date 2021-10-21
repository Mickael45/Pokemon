import { memo } from "react";
import { getRandomTransformAnimation } from "../../animations";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../../utils";
import { PokemonType, ImageWithPlaceholder } from "../";
import styles from "./Pokemon.module.css";

type IProps = IPokemon & {
  onTypeClick: (type: string) => void;
};

const Pokemon = ({ name, imageUrl, id, types, onTypeClick }: IProps) => {
  const renderType = (type: string) => <PokemonType key={`${id}-${type}`} type={type} handleClick={onTypeClick} />;
  const renderTypes = () => types.split(",").map(renderType);

  return (
    <div className={[styles.container, getRandomTransformAnimation()].join(" ")}>
      <ImageWithPlaceholder src={imageUrl} alt="pokemon pic" />
      <div>{`#${formatNumberToMatchLength(id)}`}</div>
      <h3>{capitalizeFirstLetter(name)}</h3>
      {renderTypes()}
    </div>
  );
};

export default memo(Pokemon);
