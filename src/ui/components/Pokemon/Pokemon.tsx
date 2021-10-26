import { memo } from "react";
import { useHistory } from "react-router-dom";
import { getRandomTransformAnimation } from "../../animations/transform/transform";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../../utils/stringManipulation";
import ImageWithPlaceholder from "../ImageWithPlaceholder/ImageWithPlaceholder";
import styles from "./Pokemon.module.css";
import PokemonTypes from "../PokemonTypes/PokemonTypes";

type IProps = IBasicPokemon & {
  onTypeClick: (type: PokemonType) => void;
};

const Pokemon = ({ name, imageUrl, id, types, onTypeClick }: IProps) => {
  const history = useHistory();
  const handleTagClick = () => history.push(`/details/${id}`);

  return (
    <div className={[styles.container, getRandomTransformAnimation()].join(" ")}>
      <ImageWithPlaceholder src={imageUrl} alt="pokemon pic" handleClick={handleTagClick} />
      <div onClick={handleTagClick}>{`#${formatNumberToMatchLength(id)}`}</div>
      <h3 onClick={handleTagClick}>{capitalizeFirstLetter(name)}</h3>
      <span>
        <PokemonTypes id={id} handleClick={onTypeClick} types={types} />
      </span>
    </div>
  );
};

export default memo(Pokemon);
