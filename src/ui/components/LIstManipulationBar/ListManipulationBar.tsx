import { getDivClassesById } from "../../../utils/domManipulation";
import ListFilteringDropdown from "../ListFilteringDropdown/ListFilteringDropdown";
import ListFilteringInput from "../ListFilteringInput/ListFilteringInput";
import logo from "../../../assets/logo.svg";
import styles from "./ListManipulationBar.module.css";
import { useHistory } from "react-router-dom";

const DRAWER_ELEMENT_ID = "drawerElementId";
const ARROW_ELEMENT_ID = "arrowElementId";

const ListManipulationBar = () => {
  const history = useHistory();

  const navigateHome = () => history.push("/");

  const openDrawer = (drawerClassList: DOMTokenList, arrowClassList: DOMTokenList) => {
    drawerClassList.add(styles.open);
    arrowClassList.add(styles.up);
  };

  const closeDrawer = (drawerClassList: DOMTokenList, arrowClassList: DOMTokenList) => {
    drawerClassList.remove(styles.open);
    arrowClassList.remove(styles.up);
  };

  const toggleDrawer = () => {
    const drawerClassList = getDivClassesById(DRAWER_ELEMENT_ID);
    const arrowClassList = getDivClassesById(ARROW_ELEMENT_ID);

    if (!drawerClassList || !arrowClassList) {
      return;
    }

    if (drawerClassList.contains(styles.open)) {
      closeDrawer(drawerClassList, arrowClassList);
    } else {
      openDrawer(drawerClassList, arrowClassList);
    }
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
