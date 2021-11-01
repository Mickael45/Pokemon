import { useContext } from "react";
import { LOW_RES } from "../constants/Style";
import AppStyleContext from "../context/AppStyleContext";

export const usePokemonPic = (pixelImageUrl: string, hdImageUrl: string) => {
  const { appStyle } = useContext(AppStyleContext);

  return appStyle === LOW_RES ? pixelImageUrl : hdImageUrl;
};
