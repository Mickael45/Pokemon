import { capitalizeFirstLetter } from "../../../utils";
import styles from "./PokemonType.module.css";
const { typeColor, typeContainer } = styles;

interface IProps {
  type: string;
  handleClick: (type: string) => void;
}

const PokemonType = ({ type, handleClick }: IProps) => {
  const handleTypeClick = () => handleClick(type);

  return (
    <span className={[typeContainer, typeColor].join(" ")} data-type={type} onClick={handleTypeClick}>
      {capitalizeFirstLetter(type)}
    </span>
  );
};

export default PokemonType;
