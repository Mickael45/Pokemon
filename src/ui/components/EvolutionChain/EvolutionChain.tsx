import Pokemon from "../Pokemon/Pokemon";
import styles from "./EvolutionChain.module.css";

interface IProps {
  chain: IBasicPokemon[];
  handleClick: (type: string) => void;
}

const EvolutionChain = ({ chain, handleClick }: IProps) => {
  const renderPokemon = (pokemon: IBasicPokemon) => <Pokemon key={pokemon.id} {...pokemon} onTypeClick={handleClick} />;
  const renderPokemons = () => chain.map(renderPokemon);

  return <div className={styles.container}>{renderPokemons()}</div>;
};

export default EvolutionChain;
