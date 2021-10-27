import pikachu from "../../../assets/surprised-pikachu.png";
import { SOMETHING_WRONG_HAPPENED } from "../../../constants/Errors";
import { ErrorTypeToMessageHashMap } from "../../../constants/ErrorTypeToMessageHashMap";
import styles from "./ErrorScreen.module.css";

interface IProps {
  type?: ErrorType;
}

const ErrorScreen = ({ type = SOMETHING_WRONG_HAPPENED }: IProps) => (
  <div className={styles.container}>
    <img src={pikachu} alt="surprised pikachu" />
    {ErrorTypeToMessageHashMap[type]}
  </div>
);

export default ErrorScreen;
