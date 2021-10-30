import {
  NORMAL,
  FIRE,
  WATER,
  ELECTRIC,
  GRASS,
  ICE,
  FIGHTING,
  POISON,
  GROUND,
  FLYING,
  PSYCHIC,
  BUG,
  ROCK,
  GHOST,
  DRAGON,
  DARK,
  STEEL,
  FAIRY,
  ALL,
} from "../constants/Types";

declare global {
  export type FilteringType =
    | typeof ALL
    | typeof NORMAL
    | typeof FIRE
    | typeof WATER
    | typeof ELECTRIC
    | typeof GRASS
    | typeof ICE
    | typeof FIGHTING
    | typeof POISON
    | typeof GROUND
    | typeof FLYING
    | typeof PSYCHIC
    | typeof BUG
    | typeof ROCK
    | typeof GHOST
    | typeof DRAGON
    | typeof DARK
    | typeof STEEL
    | typeof FAIRY;
}
