import { capitalizeFirstLetter } from "../../../utils/stringManipulation";
import styles from "./PokemonType.module.css";
import pokemonTypesColor from "../../../constants/TypesColor.json";
import { useHistory } from "react-router-dom";
const { typeContainer } = styles;

interface IProps {
  type: PokemonType;
  children?: string;
}

const PokemonType = ({ type, children = "" }: IProps) => {
  const history = useHistory();
  const castedPokemonTypesColor = pokemonTypesColor as HashMap;

  const handleTypeClick = () =>
    history.push({
      pathname: "/",
      search: `name=${type}&field=types`,
    });

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
