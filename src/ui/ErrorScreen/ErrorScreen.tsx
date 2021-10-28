import pikachu from "../../assets/surprised-pikachu.png";
import { ErrorTypeToMessageHashMap } from "../../constants/ErrorTypeToMessageHashMap";
import styles from "./ErrorScreen.module.css";

interface IErrorScreenProps {
  type: ErrorType;
}

export const ErrorScreen = ({ type }: IErrorScreenProps) => (
  <div className={styles.container}>
    <div>
      <img src={pikachu} alt="surprised pikachu" />
      {ErrorTypeToMessageHashMap[type]}
    </div>
  </div>
);
