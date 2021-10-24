import { useEffect } from "react";
import { draw, updateColors } from "./lib";

interface Props {
  axisDataList: {
    value: number;
    label: string;
  }[];
  color: string;
  title: string;
}

const containerIDSuffix = "radarContainer";

const Radar = ({ axisDataList, color, title }: Props): JSX.Element => {
  const containerID = `${title.replaceAll(" ", "")}-${containerIDSuffix}`;

  useEffect(() => {
    draw(`#${containerID}`, axisDataList, color);
  }, []);

  useEffect(() => {
    updateColors(color);
  }, [color]);

  return (
    <div>
      <h1>{title}</h1>
      <div id={containerID} />
    </div>
  );
};

export default Radar;
