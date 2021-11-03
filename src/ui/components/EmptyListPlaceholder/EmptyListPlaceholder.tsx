import styles from "./EmptyListPlaceholder.module.css";
import Image from "next/image";
import { usePokemonPic } from "../../../hooks/usePokemonPic";

interface IProps {
  text: string;
}

const EmptyListPlaceholder = ({ text }: IProps) => {
  const gif = usePokemonPic("/images/sleepy-pikachu.gif", "/images/sleepy-pikachu-hd.gif");

  return (
    <div className={styles.container}>
      <Image src={gif} alt="sleepy pikachu" placeholder="blur" blurDataURL={gif} height={300} width={300} />
      {text}
    </div>
  );
};

export default EmptyListPlaceholder;
