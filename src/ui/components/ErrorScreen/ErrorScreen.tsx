import { ErrorTypeToMessageHashMap } from "../../../constants/ErrorTypeToMessageHashMap";
import { usePokemonPic } from "../../../hooks/usePokemonPic";
import surprisedPikachu from "../../../assets/surprised-pikachu.png";
import surprisedPikachuHd from "../../../assets/surprised-pikachu-hd.png";
import styles from "./ErrorScreen.module.css";

interface IProps {
  type: ErrorType;
}

export const ErrorScreen = ({ type }: IProps) => {
  const gif = usePokemonPic(surprisedPikachu, surprisedPikachuHd);

  return (
    <div id="error-screen" className={styles.container}>
      <div>
        <img src={gif} alt="surprised pikachu" />
        <div>{ErrorTypeToMessageHashMap[type]}</div>
      </div>
    </div>
  );
};
