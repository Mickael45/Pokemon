import { MouseEventHandler } from "react";
import { capitalizeFirstLetter } from "../../utils";
import styles from "./PokemonType.module.css";

interface IProps {
  id: number;
  type: string;
  onClick: MouseEventHandler;
}

const PokemonType = ({ id, type, onClick }: IProps) => (
  <span className={styles.typeColor} key={`${id}-${type}`} data-type={type} onClick={onClick}>
    {capitalizeFirstLetter(type)}
  </span>
);

export default PokemonType;
