import { useContext } from "react";
import { PIXEL_ART } from "../constants/Style";
import AppStyleContext from "../context/AppStyleContext";

export const usePokemonPic = (pixelImageUrl: string, hdImageUrl: string) => {
  const { appStyle } = useContext(AppStyleContext);

  return appStyle === PIXEL_ART ? pixelImageUrl : hdImageUrl;
};
