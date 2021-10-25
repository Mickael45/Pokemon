import { capitalizeFirstLetter } from "../../../utils";
import styles from "./PokemonType.module.css";
const { typeColor, typeContainer } = styles;

interface IProps {
  type: string;
  handleClick: (type: string) => void;
  children?: string;
}

const PokemonType = ({ type, handleClick, children = "" }: IProps) => {
  const handleTypeClick = () => handleClick(type);

  return (
    <span className={[typeContainer, typeColor].join(" ")} data-type={type} onClick={handleTypeClick}>
      {capitalizeFirstLetter(type)}
      {children}
    </span>
  );
};

export default PokemonType;
