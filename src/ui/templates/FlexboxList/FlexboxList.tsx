import { IntersectionObserver } from "../../components";
import styles from "./FlexboxList.module.css";

interface IProps {
  children: JSX.Element[];
  showMore: () => void;
}

const FlexboxList = ({ children, showMore }: IProps) => {
  const renderIntersectionObserver = () =>
    children?.length > 0 ? (
      <IntersectionObserver handleIntersection={showMore}>
        <div>Loading More...</div>
      </IntersectionObserver>
    ) : null;

  return (
    <>
      <div className={styles.flexbox}>{children}</div>
      {renderIntersectionObserver()}
    </>
  );
};

export default FlexboxList;
