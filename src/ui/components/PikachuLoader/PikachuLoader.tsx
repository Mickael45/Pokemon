import { useState, useEffect, useContext } from "react";
import pikachuGif from "../../../assets/running-pikachu.gif";
import pikachuGifHD from "../../../assets/running-pikachu-hd.gif";
import styles from "./PikachuLoader.module.css";
import AnimatedText from "../AnimatedText/AnimatedText";
import ResolutionContext from "../../../context/ResolutionContext";
import { LOW_RESOLUTION } from "../../../constants/Resolution";

const TEXT_UPDATE_INTERVAL_MS = 4000;

const LoadingTexts = [
  `Pikachu ! Go! `,
  "He should be back in a sec...",
  "Don't panic, he's on his way back !",
  "Does Anyone Actually Read This ?",
];

const PikachuLoader = () => {
  const [loadingText, setLoadingText] = useState(LoadingTexts[0]);
  const { resolution } = useContext(ResolutionContext);

  const generateNextIndex = () => {
    const areTextsTheSame = (text: string) => text === loadingText;
    const currentTextIndex = LoadingTexts.findIndex(areTextsTheSame);
    const incrementedTextIndex = currentTextIndex + 1;

    return incrementedTextIndex === LoadingTexts.length ? 0 : incrementedTextIndex;
  };

  const changeLoadingText = () => setLoadingText(LoadingTexts[generateNextIndex()]);

  const triggerInterval = () => {
    const interval = setInterval(changeLoadingText, TEXT_UPDATE_INTERVAL_MS);

    const clearCreatedInterval = () => clearInterval(interval);

    return clearCreatedInterval;
  };

  useEffect(triggerInterval, [loadingText]);

  const gifToUse = resolution === LOW_RESOLUTION ? pikachuGif : pikachuGifHD;

  return (
    <div id="loading-screen" className={styles.container}>
      <div>
        <img src={gifToUse} alt="pika pika" />
        <AnimatedText text={loadingText} />
      </div>
    </div>
  );
};

export default PikachuLoader;
