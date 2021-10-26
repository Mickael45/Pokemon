export const extractEffectiveness = (value: PokemonInteractionType): PokemonEffectivenessType =>
  Object.values<PokemonEffectivenessType>(value)[0];
