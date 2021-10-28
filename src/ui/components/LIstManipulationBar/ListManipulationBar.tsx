import ListSortingDropdown from "../ListFilteringDropdown/ListFilteringDropdown";
import ListFilteringDropdown from "../ListFilteringDropdown/ListFilteringDropdown";
import styles from "./ListManipulationBar.module.css";

const ListManipulationBar = () => (
  <div className={styles.container}>
    <ListFilteringDropdown />
    <div>
      <form onSubmit={() => {}}>
        <input id="input" />
        <button placeholder="search by name" onClick={() => {}}>
          Search
        </button>
      </form>
    </div>
    <ListSortingDropdown />
  </div>
);

export default ListManipulationBar;
