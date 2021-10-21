import styles from "./FlexboxList.module.css";

interface IProps {
  children: JSX.Element[];
  showLoadMoreButton: boolean;
  onClick: () => void;
}

const FlexboxList = ({ children, showLoadMoreButton = false, onClick }: IProps) => {
  const renderLoadMoreButton = () => (showLoadMoreButton ? <button onClick={onClick}>Load More</button> : null);

  return (
    <>
      <div className={styles.flexbox}>{children}</div>
      <div>{renderLoadMoreButton()}</div>
    </>
  );
};

export default FlexboxList;
