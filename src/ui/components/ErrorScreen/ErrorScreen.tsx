import pikachu from "../../../assets/surprised-pikachu.png";
import { ErrorTypeToMessageHashMap } from "../../../constants/ErrorTypeToMessageHashMap";
import styles from "./ErrorScreen.module.css";

interface IProps {
  type: ErrorType;
}

export const ErrorScreen = ({ type }: IProps) => (
  <div id="error-screen" className={styles.container}>
    <div>
      <img src={pikachu} alt="surprised pikachu" />
      <div>{ErrorTypeToMessageHashMap[type]}</div>
    </div>
  </div>
);
