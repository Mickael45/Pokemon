import Pokemon from "../Pokemon/Pokemon";
import styles from "./EvolutionChain.module.css";

interface IProps {
  chain: IBasicPokemon[];
}

const EvolutionChain = ({ chain }: IProps) => {
  const renderPokemon = (pokemon: IBasicPokemon) => <Pokemon key={pokemon.id} {...pokemon} />;
  const renderPokemons = () => chain.map(renderPokemon);

  return <div className={styles.container}>{renderPokemons()}</div>;
};

export default EvolutionChain;
