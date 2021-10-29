import ListSortingDropdown from "../ListSortingDropdown/ListSortingDropdown";
import ListFilteringDropdown from "../ListFilteringDropdown/ListFilteringDropdown";
import ListFilteringInput from "../ListFilteringInput/ListFilteringInput";

import styles from "./ListManipulationBar.module.css";

const ListManipulationBar = () => (
  <div className={styles.container}>
    <ListFilteringDropdown />
    <ListFilteringInput />
    <ListSortingDropdown />
  </div>
);

export default ListManipulationBar;
