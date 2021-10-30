import { useContext, useEffect } from "react";
import PokemonContext from "../../../context/PokemonContext";
import * as FilteringTypes from "../../../constants/FilteringTypes";
import useQueryParams from "../../../hooks/useQueryParams";
import styles from "./ListFiltering.module.css";
import PokemonType from "../PokemonType/PokemonType";
import { useHistory } from "react-router-dom";

const filteringOptions = Object.values(FilteringTypes);

const ListFilteringDropdown = () => {
  let filteringQuery = useQueryParams();

  if (filteringQuery && filteringQuery.field === "types") {
    filteringQuery = filteringQuery.name;
  } else {
    filteringQuery = FilteringTypes.ALL;
  }
  const history = useHistory();
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemonsByField = (type: string) => {
    const doestTypesContainType = (pokemon: IBasicPokemon) =>
      pokemon.types.includes(type) || pokemon.types.split(",").reverse().join(",").includes(type);

    const filteredPokemons = pokemons.filter(doestTypesContainType);

    return filteredPokemons;
  };

  const filterPokemons = () => {
    if (!pokemons || !pokemons.length) {
      return;
    }
    const typeElements = filteringOptions.map(
      (filterOption) => document.querySelector(`[data-type=${filterOption}]`) as HTMLSpanElement
    );

    if (!typeElements) {
      return;
    }
    typeElements.forEach((element: HTMLSpanElement) => {
      if (filteringQuery.split(",").includes(element.dataset.type)) {
        element.classList.add(styles.highlight);
      } else {
        element.classList.remove(styles.highlight);
      }
    });
    const filteredPokemons = filteringQuery !== FilteringTypes.ALL ? filterPokemonsByField(filteringQuery) : pokemons;

    setPokemons(filteredPokemons);
  };

  useEffect(filterPokemons, [filteringQuery, pokemons]);

  const selectPokemonType = (type: FilteringType) => {
    const typeElement = document.querySelector(`[data-type=${type}]`);

    if (!typeElement) {
      return;
    }
    if (typeElement.classList.contains(styles.highlight)) {
      const currentQueryTypes = filteringQuery.split(",");
      const typeIndex = currentQueryTypes.findIndex((filterType: FilteringType) => filterType === type);
      currentQueryTypes.splice(typeIndex, 1).join(",");

      history.push({
        pathname: "/",
        search: `name=${currentQueryTypes}&field=types`,
      });
    } else {
      const currentQueryTypes = filteringQuery.split(",");
      const allIndex = currentQueryTypes.findIndex((filterType: FilteringType) => filterType === FilteringTypes.ALL);

      console.log(currentQueryTypes, allIndex);

      if (allIndex >= 0) {
        currentQueryTypes.splice(allIndex, 1);
      }

      currentQueryTypes.push(type);
      history.push({
        pathname: "/",
        search: `name=${currentQueryTypes.join(",")}&field=types`,
      });
    }
  };

  const renderPokemonType = (type: FilteringType) => (
    <PokemonType key={type} type={type} handleTypeClick={selectPokemonType} />
  );

  const renderPokemonTypes = () => filteringOptions.map(renderPokemonType);

  return (
    <div className={styles.container}>
      <div>{renderPokemonTypes()} </div>
    </div>
  );
};

export default ListFilteringDropdown;
