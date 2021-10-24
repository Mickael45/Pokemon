import { useState } from "react";
import styles from "./ImageWithPlaceholder.module.css";

interface IProps {
  src: string;
  alt: string;
  handleClick?: () => void;
}

const ImageWithPlaceholder = ({ src, alt, handleClick }: IProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoadedEvent = () => setIsLoaded(true);

  const renderImage = () => (
    <img
      src={src}
      data-loaded={isLoaded}
      className={!isLoaded ? styles.collapse : ""}
      onLoad={handleImageLoadedEvent}
      onClick={handleClick}
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