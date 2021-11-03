import { FormEvent, useEffect } from "react";
import { useHistory } from "react-router-dom";
import searchIcon from "../../../assets/search.svg";
import { getElementById } from "../../../utils/domManipulation";
import useFiltering from "../../../hooks/useFiltering";
import { usePokemonIdFromQuery, usePokemonNameFromQuery } from "../../../hooks/useQueryParams";
import styles from "./SearchInput.module.css";
import { HOME } from "../../../constants/Routes";

const NAME_INPUT_ID = "nameInputId";

const SearchInput = () => {
  const id = usePokemonIdFromQuery();
  const name = usePokemonNameFromQuery();
  const filteredPokemons = useFiltering();
  const history = useHistory();

  const handlePokemonsAndFilteringQueryChange = () => {
    const input = getElementById(NAME_INPUT_ID) as HTMLInputElement;

    input.value = id || name;
  };

  useEffect(handlePokemonsAndFilteringQueryChange, [id, name, filteredPokemons]);

  const createQuery = () => {
    const { value = "" } = getElementById(NAME_INPUT_ID) as HTMLInputElement;

    if (value === "") {
      history.push(HOME);
      return;
    }
    const search = !isNaN(+value) ? `id=${value}` : `name=${value}`;

    history.push({
      pathname: HOME,
      search,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createQuery();
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <div>
        <input autoComplete="off" placeholder="Search a Pokemon by name or id" id={NAME_INPUT_ID} />
        <img src={searchIcon} onClick={createQuery} alt="searchIcon" />
      </div>
    </form>
  );
};

export default SearchInput;
