interface IProps {
  setFilteringType: (filteringType: Filter) => void;
  handleSearchButtonClick: () => void;
}

const FilterBar = ({ setFilteringType, handleSearchButtonClick }: IProps) => {
  const resetFilteringType = () => setFilteringType(null);

  return (
    <>
      <button onClick={resetFilteringType}>Show All types</button>
      <div>
        <form onSubmit={handleSearchButtonClick}>
          <input id="input" />
          <button placeholder="search by name" onClick={handleSearchButtonClick}>
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default FilterBar;
