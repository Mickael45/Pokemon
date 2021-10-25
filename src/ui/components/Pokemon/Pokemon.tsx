import { memo } from "react";
import { useHistory } from "react-router-dom";
import { getRandomTransformAnimation } from "../../animations";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../../utils";
import { PokemonType, ImageWithPlaceholder } from "../";
import styles from "./Pokemon.module.css";

type IProps = IBasicPokemon & {
  onTypeClick: (type: string) => void;
};

const Pokemon = ({ name, imageUrl, id, types, onTypeClick }: IProps) => {
  const history = useHistory();
  const renderType = (type: string) => <PokemonType key={`${id}-${type}`} type={type} handleClick={onTypeClick} />;
  const renderTypes = () => types.split(",").map(renderType);

  const handleTagClick = () => history.push(`/details/${id}`);

  return (
    <div className={[styles.container, getRandomTransformAnimation()].join(" ")}>
      <ImageWithPlaceholder src={imageUrl} alt="pokemon pic" handleClick={handleTagClick} />
      <div onClick={handleTagClick}>{`#${formatNumberToMatchLength(id)}`}</div>
      <h3 onClick={handleTagClick}>{capitalizeFirstLetter(name)}</h3>
      <span>{renderTypes()}</span>
    </div>
  );
};

export default memo(Pokemon);
