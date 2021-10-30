import { useState, useEffect } from "react";
import pikachuGif from "../../../assets/running-pikachu.gif";
import styles from "./PikachuLoader.module.css";
import AnimatedText from "../AnimatedText/AnimatedText";
import Page from "../../templates/Page/Page";

const TEXT_UPDATE_INTERVAL_MS = 4000;

const LoadingTexts = [
  `Pikachu ! Go! `,
  "He should be back in a sec...",
  "Don't panic, he's on his way back !",
  "Does Anyone Actually Read This ?",
];

const PikachuLoader = () => {
  const [loadingText, setLoadingText] = useState(LoadingTexts[0]);

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

  return (
    <Page>
      <div className={styles.container}>
        <img src={pikachuGif} alt="pika pika" />
        <AnimatedText text={loadingText} />
      </div>
    </Page>
  );
};

export default PikachuLoader;
