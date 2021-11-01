import { useContext } from "react";
import AppStyleContext from "../../../context/AppStyleContext";
import styles from "./Page.module.css";
import { HD, PIXEL_ART } from "../../../constants/Style";

interface IProps {
  children: JSX.Element;
}

const Page = ({ children }: IProps) => {
  const { appStyle, setAppStyle } = useContext(AppStyleContext);

  const getOppositeStyle = () => (appStyle === PIXEL_ART ? HD : PIXEL_ART);

  const handleClick = () => {
    setAppStyle(getOppositeStyle());
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClick}>{getOppositeStyle()}</button>
      {children}
    </div>
  );
};

export default Page;
