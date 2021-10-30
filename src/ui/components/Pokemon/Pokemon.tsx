import { memo } from "react";
import { useHistory } from "react-router-dom";
import { getRandomTransformAnimation } from "../../animations/transform/transform";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../../utils/stringManipulation";
import ImageWithPlaceholder from "../ImageWithPlaceholder/ImageWithPlaceholder";
import styles from "./Pokemon.module.css";
import PokemonTypes from "../PokemonTypes/PokemonTypes";

const Pokemon = ({ name, imageUrl, id, types }: IBasicPokemon) => {
  const history = useHistory();
  const handleTagClick = () => history.push(`/details/${id}`);

  return (
    <div className={[styles.container, getRandomTransformAnimation()].join(" ")}>
      <ImageWithPlaceholder src={imageUrl} alt="pokemon pic" handleClick={handleTagClick} />
      <div>
        <div onClick={handleTagClick}>{`#${formatNumberToMatchLength(id)}`}</div>
        <h5 onClick={handleTagClick}>{capitalizeFirstLetter(name)}</h5>
      </div>
      <span>
        <PokemonTypes id={id} types={types} />
      </span>
    </div>
  );
};

export default memo(Pokemon);
