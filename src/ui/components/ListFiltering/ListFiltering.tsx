import { useContext, useEffect } from "react";
import PokemonContext from "../../../context/PokemonContext";
import * as FilteringTypes from "../../../constants/Types";
import useQueryParams from "../../../hooks/useQueryParams";
import styles from "./ListFiltering.module.css";
import PokemonType from "../PokemonType/PokemonType";
import { useHistory } from "react-router-dom";
import {
  addClassToElement,
  doesElementContainClass,
  getElementByQuerySelector,
  removeClassFromElement,
} from "../../../utils/domManipulation";
import { filterPokemonsByTypes } from "../../../utils/pokemonTypes/filtering";

const filteringOptions = Object.values(FilteringTypes);

const ListFiltering = () => {
  const filteringQuery = useQueryParams();
  const history = useHistory();
  const { pokemons, setPokemons } = useContext(PokemonContext);

  const filterPokemons = () => {
    const filteredPokemons = filteringQuery !== "" ? filterPokemonsByTypes(pokemons, filteringQuery) : pokemons;

    setPokemons(filteredPokemons);
  };

  const doesFilteringQueryIncludeType = (type: PokemonType) => filteringQuery.split(",").includes(type);

  const applyStyle = (element: HTMLSpanElement) =>
    doesFilteringQueryIncludeType(element.dataset.type as PokemonType)
      ? addClassToElement(element, styles.highlight)
      : removeClassFromElement(element, styles.highlight);

  const applySelectedStyleToSelectedTypes = () => {
    const getTypeElement = (type: PokemonType) => getElementByQuerySelector(`[data-type=${type}]`) as HTMLSpanElement;
    const typeElements = filteringOptions.map(getTypeElement);

    if (!typeElements) {
      return;
    }

    typeElements.forEach(applyStyle);
  };

  const handlePokemonsAndFilteringQueryChange = () => {
    if (!pokemons || !pokemons.length) {
      return;
    }

    applySelectedStyleToSelectedTypes();
    filterPokemons();
  };

  useEffect(handlePokemonsAndFilteringQueryChange, [filteringQuery, pokemons]);

  const removeTypeFromQuery = (type: PokemonType | string) => {
    const doesFilterTypeMatchWithType = (filterType: PokemonType | string) => filterType === type;

    const currentQueryTypes = filteringQuery.split(",");
    const typeIndex = currentQueryTypes.findIndex(doesFilterTypeMatchWithType);

    currentQueryTypes.splice(typeIndex, 1);

    return currentQueryTypes.join(",");
  };

  const addTypeToQuery = (type: PokemonType | string) => {
    const currentQueryTypes = filteringQuery === "" ? [] : filteringQuery.split(",");

    currentQueryTypes.push(type);

    return currentQueryTypes.join(",");
  };

  const createQuery = (type: string, element: HTMLElement) => {
    const types = doesElementContainClass(element, styles.highlight) ? removeTypeFromQuery(type) : addTypeToQuery(type);
    const search = types === "" ? "" : `name=${types}&field=types`;

    history.push({
      pathname: "/",
      search,
    });
  };

  const handleTypeClick = (type: PokemonType) => {
    const typeElement = getElementByQuerySelector(`[data-type=${type}]`);

    return typeElement ? createQuery(type, typeElement) : null;
  };

  const renderPokemonType = (type: PokemonType) => (
    <PokemonType key={type} type={type} handleTypeClick={handleTypeClick} />
  );

  const renderPokemonTypes = () => filteringOptions.map(renderPokemonType);

  return (
    <div className={styles.container}>
      <div>{renderPokemonTypes()}</div>
    </div>
  );
};

export default ListFiltering;
