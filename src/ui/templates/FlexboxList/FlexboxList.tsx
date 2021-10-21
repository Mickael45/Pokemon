import { IntersectionObserver } from "../../components";
import styles from "./FlexboxList.module.css";

interface IProps {
  children: JSX.Element[];
  showMore: () => void;
}

const FlexboxList = ({ children, showMore }: IProps) => (
  <>
    <div className={styles.flexbox}>{children}</div>
    <IntersectionObserver handleIntersection={showMore}>
      <div>Load More</div>
    </IntersectionObserver>
  </>
);

export default FlexboxList;
