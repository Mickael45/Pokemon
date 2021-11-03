import styles from "./BanneredButton.module.css";

interface IProps {
  children: string;
}

const BanneredButton = ({ children }: IProps) => {
  return (
    <a id="bannered-button" href="type-interactions" className={styles.container}>
      {children}
    </a>
  );
};

export default BanneredButton;
