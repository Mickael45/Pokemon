export const filterPokemonsByTypes = (pokemons: IBasicPokemon[], types: string) => {
  const doestTypesContainType = (pokemon: IBasicPokemon) =>
    pokemon.types.includes(types) || pokemon.types.split(",").reverse().join(",").includes(types);

  const filteredPokemons = pokemons.filter(doestTypesContainType);

  return filteredPokemons;
};

export const filterPokemonByName = (pokemons: IBasicPokemon[], value: string) => {
  const doValueAndPokemonNameMatchPartially = (pokemon: IBasicPokemon) => pokemon.name.includes(value);

  return value === "" ? pokemons : pokemons.filter(doValueAndPokemonNameMatchPartially);
};

export const filteredPokemonsById = (pokemons: IBasicPokemon[], id: number) => {
  const doesPokemonIdMatchWithId = (pokemon: IBasicPokemon) => pokemon.id === id;

  return pokemons.filter(doesPokemonIdMatchWithId);
};
