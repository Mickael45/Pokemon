import { ChangeEventHandler } from "react";

interface IProps {
  options: string[];
  handleOptionSelectionChange: ChangeEventHandler;
}

const Dropdown = ({ options, handleOptionSelectionChange }: IProps) => {
  const renderSortingType = (sortingType: string) => (
    <option key={sortingType} value={sortingType}>
      {sortingType}
    </option>
  );

  const renderOptions = () => options.map(renderSortingType);

  return <select onChange={handleOptionSelectionChange}>{renderOptions()}</select>;
};

export default Dropdown;
