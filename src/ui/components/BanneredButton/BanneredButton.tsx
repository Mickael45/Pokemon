import styles from "./BanneredButton.module.css";
import { TYPE_INTERACTIONS } from "../../../constants/Routes";

interface IProps {
  children: string;
}

const BanneredButton = ({ children }: IProps) => {
  return (
    <a id="bannered-button" href={TYPE_INTERACTIONS} className={styles.container}>
      {children}
    </a>
  );
};

export default BanneredButton;
