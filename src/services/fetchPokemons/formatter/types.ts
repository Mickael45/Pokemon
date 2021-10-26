export type PokemonType = {
  type: {
    name: string;
  };
};

export type PokemonEvolutionData = {
  evolves_to: [{ evolves_to?: []; evolution_details: [] }];
  evolution_details: {};
  species: { name: string };
};

export type PokemonTypeData = {
  pokemon: {
    name: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type PokemonAbility = {
  ability: {
    name: string;
  };
  is_hidden: boolean;
};

export type FlavorTextEntry = {
  language: {
    name: string;
  };
  flavor_text: string;
};

export type GeneraEntry = {
  language: {
    name: string;
  };
  genus: string;
};

export type PokemonSpecie = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorTextEntry[];
  genera: GeneraEntry[];
};

export interface IPokemonResponseType {
  id: number;
  name: string;
  types: PokemonType[];
  stats: PokemonStat[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
}
