import pikachu from "../../../assets/surprised-pikachu.png";
import { ErrorTypeToMessageHashMap } from "../../../constants/ErrorTypeToMessageHashMap";
import Page from "../../templates/Page/Page";
import styles from "./ErrorScreen.module.css";

interface IProps {
  type: ErrorType;
}

export const ErrorScreen = ({ type }: IProps) => (
  <Page>
    <div className={styles.container}>
      <div>
        <img src={pikachu} alt="surprised pikachu" />
        <div>{ErrorTypeToMessageHashMap[type]}</div>
      </div>
    </div>
  </Page>
);
