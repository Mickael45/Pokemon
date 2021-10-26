import PokemonType from "../PokemonType/PokemonType";
import styles from "./PokemonWeaknesses.module.css";

interface IProps {
  id: string;
  types: Weakness[];
  handleClick: (type: PokemonType) => void;
}

const PokemonWeaknesses = ({ id, types, handleClick }: IProps) => {
  const renderType = ({ type, factor }: Weakness) => {
    return (
      <PokemonType key={`${id}-${type}`} type={type} handleClick={handleClick}>
        {`x${factor}`}
      </PokemonType>
    );
  };
  const renderTypes = () => types.map(renderType);

  return <span className={styles.container}>{renderTypes()}</span>;
};

export default PokemonWeaknesses;
