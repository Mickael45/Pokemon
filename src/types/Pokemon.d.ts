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
  | "fly"
  | "psychic"
  | "bug"
  | "rock"
  | "ghost"
  | "dragon"
  | "dark"
  | "steel"
  | "fairy";

interface IPokemonTypeInteraction {
  key: string;
  values: { [key: PokemonTypes]: string }[];
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
};
