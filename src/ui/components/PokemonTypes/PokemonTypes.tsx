import PokemonType from "../PokemonType/PokemonType";
import styles from "./PokemonTypes.module.css";

interface IProps {
  id: number | string;
  types: string;
  handleClick: (type: PokemonType) => void;
}

const PokemonTypes = ({ id, types, handleClick }: IProps) => {
  const renderType = (type: PokemonType) => <PokemonType key={`${id}-${type}`} type={type} handleClick={handleClick} />;
  const renderTypes = () => {
    const splitTypes = types.split(",") as PokemonType[];

    return splitTypes.map(renderType);
  };

  return <span className={styles.container}>{renderTypes()}</span>;
};

export default PokemonTypes;
