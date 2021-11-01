import { createContext } from "react";
import { PIXEL_ART } from "../constants/Style";

interface IContextProps {
  appStyle: APP_STYLE;
  setAppStyle: (appStyle: APP_STYLE) => void;
}

export default createContext<IContextProps>({
  appStyle: PIXEL_ART,
  setAppStyle: () => {},
});
