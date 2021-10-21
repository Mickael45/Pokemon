import { MouseEventHandler } from "react";
import { capitalizeFirstLetter } from "../../utils";
import styles from "./PokemonType.module.css";

interface IProps {
  type: string;
  onClick: MouseEventHandler;
}

const PokemonType = ({ type, onClick }: IProps) => (
  <span className={styles.typeColor} data-type={type} onClick={onClick}>
    {capitalizeFirstLetter(type)}
  </span>
);

export default PokemonType;
