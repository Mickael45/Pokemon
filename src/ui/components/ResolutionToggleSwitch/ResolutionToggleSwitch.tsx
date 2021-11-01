import { useContext } from "react";
import { HIGH_RES, LOW_RES } from "../../../constants/Style";
import AppStyleContext from "../../../context/AppStyleContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const ResolutionToggleSwitch = () => {
  const { appStyle, setAppStyle } = useContext(AppStyleContext);

  const getOppositeStyle = () => (appStyle === LOW_RES ? HIGH_RES : LOW_RES);

  const handleClick = () => setAppStyle(getOppositeStyle());

  return (
    <ToggleSwitch onLabel={HIGH_RES} offLabel={LOW_RES} checked={appStyle === LOW_RES} handleClick={handleClick} />
  );
};

export default ResolutionToggleSwitch;
