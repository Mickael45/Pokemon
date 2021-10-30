export const filterPokemonsByTypes = (pokemons: IBasicPokemon[], types: string) => {
  const doestTypesContainType = (pokemon: IBasicPokemon) =>
    pokemon.types.includes(types) || pokemon.types.split(",").reverse().join(",").includes(types);

  const filteredPokemons = pokemons.filter(doestTypesContainType);

  return filteredPokemons;
};
