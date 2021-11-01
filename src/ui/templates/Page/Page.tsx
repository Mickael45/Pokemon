import { useContext } from "react";
import AppStyleContext from "../../../context/AppStyleContext";
import styles from "./Page.module.css";
import { HIGH_RES, LOW_RES } from "../../../constants/Style";

interface IProps {
  children: JSX.Element;
}

const Page = ({ children }: IProps) => {
  const { appStyle, setAppStyle } = useContext(AppStyleContext);

  const getOppositeStyle = () => (appStyle === LOW_RES ? HIGH_RES : LOW_RES);

  const handleClick = () => {
    setAppStyle(getOppositeStyle());
  };

  return (
    <div className={styles.container}>
      <button id="styleSwitch" onClick={handleClick}>{`Switch to: ${getOppositeStyle()}`}</button>
      {children}
    </div>
  );
};

export default Page;
