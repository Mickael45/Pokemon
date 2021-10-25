type PokemonTypes =
  | "normal"
  | "fire"
  | "water"
  | "electric"
  | "grass"
  | "ice"
  | "fighting"
  | "poison"
  | "ground"
  | "flying"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

type PokemonInteractionTypes =
  | "no effect"
  | "not effective at all"
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
};
