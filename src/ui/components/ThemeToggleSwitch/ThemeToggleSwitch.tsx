import { useContext } from "react";
import { HIGH_RES, LOW_RES } from "../../../constants/Style";
import ResolutionContext from "../../../context/ResolutionContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

const ThemeToggleSwitch = () => {
  const { resolution, setResolution } = useContext(ResolutionContext);

  const getOppositeResolution = () => (resolution === LOW_RES ? HIGH_RES : LOW_RES);

  const handleClick = () => setResolution(getOppositeResolution());

  return (
    <ToggleSwitch onLabel={HIGH_RES} offLabel={LOW_RES} checked={resolution === LOW_RES} handleClick={handleClick} />
  );
};

export default ThemeToggleSwitch;
