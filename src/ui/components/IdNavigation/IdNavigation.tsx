import { useHistory } from "react-router-dom";
import { MAX_POKEMON_ID_ALLOWED } from "../../../constants/FetchPokemons";
import styles from "./IdNavigation.module.css";
import PreviousButton from "../PreviousButton/PreviousButton";
import NextButton from "../NextButton/NextButton";
import { DETAILS } from "../../../constants/Routes";

interface IProps {
  id: string;
}

const IdNavigation = ({ id }: IProps) => {
  const history = useHistory();

  const handleClick = (id: number) => history.push(`${DETAILS}${id}`);

  return (
    <div className={styles.container}>
      <PreviousButton handleClick={handleClick} limit={MAX_POKEMON_ID_ALLOWED} value={+id} />
      <NextButton handleClick={handleClick} limit={MAX_POKEMON_ID_ALLOWED} value={+id} />
    </div>
  );
};

export default IdNavigation;
