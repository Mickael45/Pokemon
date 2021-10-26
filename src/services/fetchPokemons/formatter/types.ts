export type PokemonType = {
  type: {
    name: string;
  };
};

export type EvolvesTo = { evolves_to: EvolvesTo[]; evolution_details: []; species: { name: string } };

export type EvolutionData = {
  evolves_to: EvolvesTo[];
  species: { name: string };
};

export type TypeData = {
  pokemon: {
    name: string;
  };
};

export type Stat = {
  base_stat: number;
  stat: {
    name: string;
  };
};

export type Ability = {
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

export type Specie = {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorTextEntry[];
  genera: GeneraEntry[];
};

export interface IPokemonResponseType {
  id: number;
  name: string;
  types: Type[];
  stats: Stat[];
  weight: number;
  height: number;
  abilities: Ability[];
}
