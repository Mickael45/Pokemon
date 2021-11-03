import { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import { getRandomTransformAnimation } from "../../animations/transform/transform";
import { capitalizeFirstLetter, formatNumberToMatchLength } from "../../../utils/stringManipulation";
import ImageWithPlaceholder from "../ImageWithPlaceholder/ImageWithPlaceholder";
import styles from "./Pokemon.module.css";
import PokemonTypes from "../PokemonTypes/PokemonTypes";
import { usePokemonPic } from "../../../hooks/usePokemonPic";
import { DETAILS } from "../../../constants/Routes";

const Pokemon = ({ name, id, pixelImageUrl, hdImageUrl, types }: IBasicPokemon) => {
  const history = useHistory();
  const imageUrl = usePokemonPic(pixelImageUrl, hdImageUrl);
  const [animation] = useState(getRandomTransformAnimation());

  const handleTagClick = () => history.push(`${DETAILS}${id}`);

  return (
    <div className={[styles.container, animation].join(" ")}>
      <ImageWithPlaceholder src={imageUrl} alt={`${name}-pic`} handleClick={handleTagClick} />
      <div>
        <div id="id" onClick={handleTagClick}>{`#${formatNumberToMatchLength(id)}`}</div>
        <h4 onClick={handleTagClick}>{`${capitalizeFirstLetter(name)}`}</h4>
      </div>
      <span>
        <PokemonTypes id={id} types={types} />
      </span>
    </div>
  );
};

export default memo(Pokemon);
