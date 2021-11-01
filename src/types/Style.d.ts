import { PIXEL_ART, HD } from "../constants/Style";

declare global {
  export type APP_STYLE = typeof PIXEL_ART | typeof HD;
}
