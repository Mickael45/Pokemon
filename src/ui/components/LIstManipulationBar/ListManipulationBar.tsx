import {
  addClassToElement,
  doesElementContainClass,
  getElementById,
  removeClassFromElement,
} from "../../../utils/domManipulation";
import ListFilteringDropdown from "../ListFiltering/ListFiltering";
import ListFilteringInput from "../ListFilteringInput/ListFilteringInput";
import logo from "../../../assets/logo.svg";
import styles from "./ListManipulationBar.module.css";
import { useHistory } from "react-router-dom";

const DRAWER_ELEMENT_ID = "drawerElementId";
const ARROW_ELEMENT_ID = "arrowElementId";

const ListManipulationBar = () => {
  const history = useHistory();

  const navigateHome = () => history.push("/");

  const openDrawer = (drawer: HTMLElement, arrow: HTMLElement) => {
    addClassToElement(drawer, styles.open);
    addClassToElement(arrow, styles.up);
  };

  const closeDrawer = (drawer: HTMLElement, arrow: HTMLElement) => {
    removeClassFromElement(drawer, styles.open);
    removeClassFromElement(arrow, styles.up);
  };

  const toggleDrawer = () => {
    const drawer = getElementById(DRAWER_ELEMENT_ID);
    const arrow = getElementById(ARROW_ELEMENT_ID);

    if (!drawer || !arrow) {
      return;
    }

    return doesElementContainClass(drawer, styles.open) ? closeDrawer(drawer, arrow) : openDrawer(drawer, arrow);
  };

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" onClick={navigateHome} />
      <div>
        <ListFilteringInput />
        <div className={[styles.drawer, styles.close].join(" ")} id={DRAWER_ELEMENT_ID}>
          <ListFilteringDropdown />
        </div>
        <div>
          <div className={styles.arrow} id={ARROW_ELEMENT_ID} onClick={toggleDrawer} />
        </div>
      </div>
    </div>
  );
};

export default ListManipulationBar;
