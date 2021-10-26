import * as POKEMON_TYPES from "../../../../constants/Types";
import { extractThreeFirstLetters, capitalizeString } from "../../../../utils/stringManipulation";

const TypeInteractionTableHeader = () => {
  const shortTypesName = Object.values(POKEMON_TYPES).map(extractThreeFirstLetters).map(capitalizeString);

  const renderHeaderTag = (content: string) => <th key={content}>{content}</th>;
  const renderHeaderTags = () => shortTypesName.map(renderHeaderTag);

  return (
    <tr>
      <th data-type="first-square" />
      {renderHeaderTags()}
    </tr>
  );
};

export default TypeInteractionTableHeader;
