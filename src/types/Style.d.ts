import { PIXEL_DEFINITION, HD } from "../constants/Style";

declare global {
  export type APP_STYLE = typeof PIXEL_DEFINITION | typeof HD;
}
