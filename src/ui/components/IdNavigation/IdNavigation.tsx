import styles from "./IdNavigation.module.css";

interface IProps {
  handleClick: (id: number) => void;
  id: string;
}

const IdNavigation = ({ handleClick, id }: IProps) => {
  const previousId = parseInt(id) - 1;
  const nextId = parseInt(id) + 1;
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
