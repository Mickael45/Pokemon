import ListSortingDropdown from "../ListSortingDropdown/ListSortingDropdown";
import ListFilteringDropdown from "../ListFilteringDropdown/ListFilteringDropdown";
import ListFilteringInput from "../ListFilteringInput/ListFilteringInput";
import styles from "./ListManipulationBar.module.css";

const ListManipulationBar = () => (
  <div className={styles.container}>
    <ListFilteringInput />
    <div>
      <ListFilteringDropdown />
      <ListSortingDropdown />
    </div>
  </div>
);

export default ListManipulationBar;
