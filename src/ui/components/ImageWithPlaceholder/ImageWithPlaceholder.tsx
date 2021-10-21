import { useState } from "react";
import styles from "./ImageWithPlaceholder.module.css";

interface IProps {
  src: string;
  alt: string;
}

const ImageWithPlaceholder = ({ src, alt }: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoadedEvent = () => setIsLoaded(true);

  const renderImage = () => (
    <img
      src={src}
      data-loaded={isLoaded}
      className={!isLoaded ? styles.collapse : ""}
      onLoad={handleImageLoadedEvent}
      alt={alt}
    />
  );

  const renderPlaceholder = () =>
    !isLoaded ? (
      <svg>
        <rect fill="#CCC" />
      </svg>
    ) : null;

  return (
    <>
      {renderPlaceholder()}
      {renderImage()}
    </>
  );
};

export default ImageWithPlaceholder;
