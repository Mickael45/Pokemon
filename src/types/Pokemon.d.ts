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
} from "../constants/Types";

import {
  NO_EFFECT,
  NOT_EFFECTIVE_AT_ALL,
  NOT_VERY_EFFECTIVE,
  NORMAL_EFFECTIVENESS,
  VERY_EFFECTIVE,
  SUPER_EFFECTIVE,
} from "../constants/EffectivenessTypes";

import { ZERO, QUARTER, HALF, ONE, TWO, FOUR } from "../constants/DamageFactors";

declare global {
  export type PokemonType =
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

  export type PokemonEffectivenessType =
    | typeof NO_EFFECT
    | typeof NOT_EFFECTIVE_AT_ALL
    | typeof NOT_VERY_EFFECTIVE
    | typeof NORMAL_EFFECTIVENESS
    | typeof VERY_EFFECTIVE
    | typeof SUPER_EFFECTIVE;

  export type DamageFactor = ZERO | QUARTER | HALF | ONE | TWO | FOUR;

  export type Weakness = {
    type: PokemonType;
    factor: DamageFactor;
  };

  export type PokemonInteractionType = {
    [key: PokemonType]: PokemonEffectivenessType;
  };
  export interface IPokemonInteractionTypes {
    key: string;
    values: PokemonInteractionType[];
  }
  export interface IPokemonStat {
    label: string;
    value: number;
  }
  export interface IBasicPokemon {
    id: number;
    name: string;
    imageUrl: string;
    types: string;
  }

  export type IFullPokemon = IBasicPokemon & {
    stats: Stat[] | [];
    weaknesses: Weakness[] | [];
    evolutionChain: IBasicPokemon[] | [];
    abilities: string[] | [];
    description: string;
    height: number;
    weight: number;
    category: string;
  };
}
