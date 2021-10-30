import Pokemon from "../Pokemon/Pokemon";
import styles from "./EvolutionChain.module.css";

interface IProps {
  chain: IBasicPokemon[];
}

const EvolutionChain = ({ chain }: IProps) => {
  const renderPokemon = (pokemon: IBasicPokemon) => <Pokemon key={pokemon.id} {...pokemon} />;
  const renderPokemons = () => chain.map(renderPokemon);

  const renderEvolutionChain = () => (
    <div className={styles.container}>
      <h3>Evolution Chain</h3>
      <div>{renderPokemons()}</div>
    </div>
  );

  return chain.length > 0 ? renderEvolutionChain() : <div />;
};

export default EvolutionChain;
