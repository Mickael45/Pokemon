import { useContext } from "react";
import { LOW_RES } from "../constants/Style";
import ResolutionContext from "../context/ResolutionContext";

export const usePokemonPic = (pixelImageUrl: string, hdImageUrl: string) => {
  const { resolution } = useContext(ResolutionContext);

  return resolution === LOW_RES ? pixelImageUrl : hdImageUrl;
};
