import EffectivenessTypeToDamageFactorHashMap from "../../../constants/EffectivenessTypeToDamageFactorHashMap";
import * as POKEMON_TYPES from "../../../constants/Types";
import styles from "./TypeInteractionsTable.module.css";

interface IProps {
  typeInteractions: IPokemonInteractionTypes[];
}

const renderHeader = () => {
  const capitalizeString = (str: string) => str.toUpperCase();
  const extractThreeFirstLetters = (str: string) => str.substring(0, 3);
  const shortTypesName = Object.values(POKEMON_TYPES).map(extractThreeFirstLetters).map(capitalizeString);

  const renderHeaderTag = (content: string) => <th key={content}>{content}</th>;

  return (
    <tr>
      <th className={styles.firstSquare} />
      {shortTypesName.map(renderHeaderTag)}
    </tr>
  );
};

const renderRow = ({ key, values }: IPokemonInteractionTypes) => {
  const convertEffectivenessStringToDamageRatio = (effectiveness: PokemonEffectivenessType) =>
    EffectivenessTypeToDamageFactorHashMap[effectiveness];
  const extractEffectiveness = (value: PokemonInteractionType): PokemonEffectivenessType =>
    Object.values<PokemonEffectivenessType>(value)[0];
  const damageRatioArray = values.map(extractEffectiveness).map(convertEffectivenessStringToDamageRatio);

  const renderData = (value: string, index: number) => (
    <td key={index} data-effectiveness={value}>
      {value === "1" ? "" : value}
    </td>
  );

  return (
    <tr key={key}>
      <th className={styles.firstSquare}>{key}</th>
      {damageRatioArray.map(renderData)}
    </tr>
  );
};

const TypeInteractionsTable = ({ typeInteractions }: IProps) => {
  const renderRows = () => typeInteractions.map(renderRow);

  return (
    <table>
      <tbody>
        {renderHeader()}
        {renderRows()}
      </tbody>
    </table>
  );
};

export default TypeInteractionsTable;
