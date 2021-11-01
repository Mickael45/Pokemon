import styles from "./EmptyListPlaceholder.module.css";
import sleepyPikachu from "../../../assets/sleepy-pikachu.gif";
import sleepyPikachuHd from "../../../assets/sleepy-pikachu-hd.gif";
import { usePokemonPic } from "../../../hooks/usePokemonPic";

const EmptyListPlaceholder = () => {
  const gif = usePokemonPic(sleepyPikachu, sleepyPikachuHd);

  return (
    <div className={styles.container}>
      <img src={gif} alt="sleepy pikachu" />
      No Pokemon found
    </div>
  );
};

export default EmptyListPlaceholder;
