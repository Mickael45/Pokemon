import { createContext } from "react";
import { LOW_RES } from "../constants/Style";

interface IContextProps {
  appStyle: APP_STYLE;
  setAppStyle: (appStyle: APP_STYLE) => void;
}

export default createContext<IContextProps>({
  appStyle: LOW_RES,
  setAppStyle: () => {},
});
