import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import styles from "./PokemonType.module.css";
import pokemonTypesColor from "../../../constants/TypesColor.json";
const { typeContainer } = styles;

interface IProps {
  type: PokemonType;
  handleClick: (type: PokemonType) => void;
  children?: string;
}

const PokemonType = ({ type, handleClick, children = "" }: IProps) => {
  const castedPokemonTypesColor = pokemonTypesColor as HashMap;

  const handleTypeClick = () => handleClick(type);

  return (
    <span
      style={{ background: castedPokemonTypesColor[type] }}
      className={typeContainer}
      data-type={type}
      onClick={handleTypeClick}
    >
      {capitalizeFirstLetter(type)}
      {children}
    </span>
  );
};

export default PokemonType;
