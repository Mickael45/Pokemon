import { useHistory, useLocation } from "react-router-dom";
import {
  addClassToElement,
  doesElementContainClass,
  getElementById,
  removeClassFromElement,
} from "../../../utils/domManipulation";
import TypesSelector from "../TypesSelector/TypesSelector";
import SearchInput from "../SearchInput/SearchInput";
import logo from "../../../assets/logo.svg";
import styles from "./NavigationBar.module.css";
import ResolutionToggleSwitch from "../ResolutionToggleSwitch/ResolutionToggleSwitch";
import ThemeToggleSwitch from "../ThemeToggleSwitch/ThemeToggleSwitch";
import BanneredButton from "../BanneredButton/BanneredButton";
import { HOME, TYPE_INTERACTIONS } from "../../../constants/Routes";

const DRAWER_ELEMENT_ID = "drawerElementId";
const ARROW_ELEMENT_ID = "arrowElementId";

const NavigationBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();

  const navigateHome = () => history.push(HOME);

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

  const renderArrow = () => (
    <div>
      <div className={styles.arrow} id={ARROW_ELEMENT_ID} onClick={toggleDrawer} />
    </div>
  );

  const renderTypeSelector = () =>
    pathname !== TYPE_INTERACTIONS ? (
      <>
        <div className={[styles.drawer, styles.close].join(" ")} id={DRAWER_ELEMENT_ID}>
          <TypesSelector />
          <BanneredButton>Type Interactions</BanneredButton>
        </div>
        {renderArrow()}
      </>
    ) : null;

  return (
    <nav className={styles.container}>
      <img src={logo} alt="logo" onClick={navigateHome} />
      <div>
        <SearchInput />
        {renderTypeSelector()}
      </div>
      <ThemeToggleSwitch />
      <ResolutionToggleSwitch />
    </nav>
  );
};

export default NavigationBar;
