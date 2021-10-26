import { useHistory } from "react-router-dom";
import styles from "./IdNavigation.module.css";

interface IProps {
  id: string;
}

const IdNavigation = ({ id }: IProps) => {
  const history = useHistory();
  const previousId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;

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
