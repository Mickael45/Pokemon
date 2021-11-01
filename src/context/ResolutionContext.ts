import { createContext } from "react";
import { LOW_RES } from "../constants/Style";

interface IContextProps {
  resolution: APP_STYLE;
  setResolution: (resolution: APP_STYLE) => void;
}

export default createContext<IContextProps>({
  resolution: LOW_RES,
  setResolution: () => {},
});
