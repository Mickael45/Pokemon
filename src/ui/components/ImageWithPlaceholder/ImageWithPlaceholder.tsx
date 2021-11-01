import { useState } from "react";
import PokeballSpinner from "../PokeballSpinner/PokeballSpinner";
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
      className={!isLoaded ? styles.collapse : styles.img}
      onLoad={handleImageLoadedEvent}
      onClick={handleClick}
      alt={alt}
    />
  );

  const renderPlaceholder = () =>
    !isLoaded ? (
      <div id="placeholder">
        <PokeballSpinner />
      </div>
    ) : null;

  return (
    <>
      {renderPlaceholder()}
      {renderImage()}
    </>
  );
};

export default ImageWithPlaceholder;
