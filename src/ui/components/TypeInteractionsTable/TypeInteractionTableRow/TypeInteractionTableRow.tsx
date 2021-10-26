import { convertEffectivenessStringToDamageRatio } from "../../../../utils/pokemonTypes/convertors";
import { extractEffectiveness } from "../../../../utils/pokemonTypes/extractor";

interface IProps {
  type: string;
  values: PokemonInteractionType[];
}

const TypeInteractionTableRow = ({ type, values }: IProps) => {
  const damageRatioArray = values.map(extractEffectiveness).map(convertEffectivenessStringToDamageRatio);

  const renderDataTag = (value: string, index: number) => (
    <td key={index} data-effectiveness={value}>
      {value === "1" ? "" : value}
    </td>
  );
  const renderDataTags = () => damageRatioArray.map(renderDataTag);

  return (
    <tr>
      <th data-type="first-square">{type}</th>
      {renderDataTags()}
    </tr>
  );
};

export default TypeInteractionTableRow;
