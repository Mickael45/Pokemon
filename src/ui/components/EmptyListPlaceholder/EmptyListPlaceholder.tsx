import styles from "./EmptyListPlaceholder.module.css";
import sleepyPikachu from "../../../assets/sleepy-pikachu.gif";
import sleepyPikachuHd from "../../../assets/sleepy-pikachu-hd.gif";
import { usePokemonPic } from "../../../hooks/usePokemonPic";

interface IProps {
  text: string;
}

const EmptyListPlaceholder = ({ text }: IProps) => {
  const gif = usePokemonPic(sleepyPikachu, sleepyPikachuHd);

  return (
    <div className={styles.container}>
      <img src={gif} alt="sleepy pikachu" />
      {text}
    </div>
  );
};

export default EmptyListPlaceholder;
