import styles from "./TypeInteractionsTable.module.css";

interface IProps {
  typeInteractions: IPokemonInteractionTypes[];
}

const POKEMON_TYPES = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

const EFFECTIVENESS_MAP: HashMap = {
  "no effect": "0",
  "not effective at all": "1/4",
  "not very effective": "1/2",
  "normal effectiveness": "",
  "very effective": "2",
  "super effective": "4",
};

const renderHeader = () => {
  const capitalizeString = (str: string) => str.toUpperCase();
  const extractThreeFirstLetters = (str: string) => str.substring(0, 3);
  const shortTypesName = POKEMON_TYPES.map(extractThreeFirstLetters).map(capitalizeString);

  const renderHeaderTag = (content: string) => <th key={content}>{content}</th>;

  return (
    <tr>
      <th className={styles.firstSquare} />
      {shortTypesName.map(renderHeaderTag)}
    </tr>
  );
};

const renderRow = ({ key, values }: IPokemonInteractionTypes) => {
  const convertEffectivenessStringToDamageRatio = (effectiveness: string) => EFFECTIVENESS_MAP[effectiveness];
  const extractEffectiveness = (value: any, index: number) => value[POKEMON_TYPES[index]];
  const damageRatioArray = values.map(extractEffectiveness).map(convertEffectivenessStringToDamageRatio);

  const renderData = (value: string, index: number) => (
    <td key={index} data-effectiveness={value}>
      {value}
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
