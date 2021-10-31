import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import styles from "./PokemonType.module.css";
import pokemonTypesColor from "../../../constants/TypesColor.json";
import { useHistory } from "react-router-dom";
const { typeContainer } = styles;

interface IProps {
  type: PokemonType;
  children?: string;
  handleTypeClick?: Function;
}

const PokemonType = ({ type, children = "", handleTypeClick }: IProps) => {
  const history = useHistory();
  const castedPokemonTypesColor = pokemonTypesColor as HashMap;

  const handleClick = () => {
    if (handleTypeClick) {
      handleTypeClick(type);
    } else {
      history.push({
        pathname: "/",
        search: `types=${type}`,
      });
    }
  };

  return (
    <span
      id="type"
      style={{ background: castedPokemonTypesColor[type] }}
      className={typeContainer}
      data-type={type}
      onClick={handleClick}
    >
      {capitalizeFirstLetter(type)}
      {children}
    </span>
  );
};

export default PokemonType;
