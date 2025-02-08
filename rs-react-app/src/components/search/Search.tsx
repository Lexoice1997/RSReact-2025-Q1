import { useResults } from '../../hooks/useResults';

export const Search = () => {
  const { searchTerm, handleSearch, handleSearchChange } = useResults();

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
    </>
  );
};
