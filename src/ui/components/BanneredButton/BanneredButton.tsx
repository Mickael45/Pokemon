import Link from "next/link";
import { TYPE_INTERACTIONS } from "../../../constants/Routes";
import styles from "./BanneredButton.module.css";

interface IProps {
  children: string;
}

const BanneredButton = ({ children }: IProps) => {
  return (
    <Link href={TYPE_INTERACTIONS}>
      <a id="bannered-button" className={styles.container}>
        {children}
      </a>
    </Link>
  );
};

export default BanneredButton;
