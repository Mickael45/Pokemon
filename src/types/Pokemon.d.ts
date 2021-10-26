import {
  FIRE,
  NORMAL,
  WATER,
  GRASS,
  ELECTRIC,
  ICE,
  ROCK,
  FIGHTING,
  POISON,
  GROUND,
  FLYING,
  PSYCHIC,
  BUG,
  GHOST,
  DARK,
  DRAGON,
  STEEL,
  FAIRY,
} from "../constants/PokemonTypes";

type PokemonTypes =
  | NORMAL
  | FIRE
  | WATER
  | ELECTRIC
  | GRASS
  | ICE
  | FIGHTING
  | POISON
  | GROUND
  | FLYING
  | PSYCHIC
  | BUG
  | ROCK
  | GHOST
  | DRAGON
  | DARK
  | STEEL
  | FAIRY;

type PokemonInteractionTypes =
  | "no effect"
  | "not effective at all"
  | "not very effective"
  | "normal effectiveness"
  | "very effective"
  | "super effective";

interface IPokemonTypeInteraction {
  key: string;
  values: { [key: PokemonTypes]: string }[];
}

type DamageFactor = "0" | "0.25" | "0.5" | "1" | "2" | "4";

type Weakness = {
  type: PokemonTypes;
  factor: DamageFactor;
};
interface IPokemonInteractionType {
  [key: PokemonTypes]: PokemonInteractionTypes;
}
interface IPokemonStat {
  label: string;
  value: number;
}
interface IBasicPokemon {
  id: number;
  name: string;
  imageUrl: string;
  types: string;
}

type IFullPokemon = IBasicPokemon & {
  stats: Stat[] | [];
  weaknesses: Weakness[] | [];
  evolutionChain: IBasicPokemon[] | [];
  abilities: string[] | [];
  description: string;
  height: number;
  weight: number;
  category: string;
};
