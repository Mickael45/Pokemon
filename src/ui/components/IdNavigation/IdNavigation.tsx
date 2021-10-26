import { useHistory } from "react-router-dom";
import styles from "./IdNavigation.module.css";
import { MAX_POKEMON_ID_ALLOWED } from "../../../constants/FetchPokemons";

interface IProps {
  id: string;
}

const IdNavigation = ({ id }: IProps) => {
  const idNumber = parseInt(id);
  const history = useHistory();

  const createPreviousId = () => (idNumber - 1 === 0 ? MAX_POKEMON_ID_ALLOWED : idNumber - 1);
  const createNextId = () => (idNumber + 1 === MAX_POKEMON_ID_ALLOWED ? 1 : idNumber + 1);

  const previousId = createPreviousId();
  const nextId = createNextId();

  const handleClick = (id: number) => history.push(`/details/${id}`);
  const handlePreviousButtonClick = () => handleClick(previousId);
  const handleNextButtonClick = () => handleClick(nextId);

  return (
    <div className={styles.container}>
      <button onClick={handlePreviousButtonClick}>{`< #${previousId}`}</button>
      <button onClick={handleNextButtonClick}>{`#${nextId} >`}</button>
    </div>
  );
};

export default IdNavigation;
