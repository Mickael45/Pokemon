import { useRef, useState, memo } from "react";
import { useIntersectionObserver } from "../../../hooks";

interface IProps {
  children: JSX.Element;
  handleIntersection: () => void;
}

const IntersectionObserver = ({ children, handleIntersection }: IProps) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold: 0.9 });

  if (entry?.isIntersecting && !isIntersecting) {
    handleIntersection();
    setIsIntersecting(true);
  } else if (!entry?.isIntersecting && isIntersecting) {
    setIsIntersecting(false);
  }

  return <span ref={ref}>{children}</span>;
};

export default memo(IntersectionObserver);
