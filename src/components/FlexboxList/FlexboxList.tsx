import styles from "./Flexbox.module.css";

interface IProps {
  children: JSX.Element[];
  showLoadMoreButton: boolean;
  onClick: () => void;
}

const FlexboxList = ({ children, showLoadMoreButton, onClick }: IProps) => {
  const renderLoadMoreButton = () => (showLoadMoreButton ? <button onClick={onClick}>Load More</button> : null);

  return (
    <div className={styles.flexbox}>
      {children}
      {renderLoadMoreButton()}
    </div>
  );
};

export default FlexboxList;
