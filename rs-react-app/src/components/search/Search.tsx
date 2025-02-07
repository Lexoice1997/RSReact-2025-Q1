type Props = {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
};

export const Search = ({
  searchTerm,
  handleSearch,
  handleSearchChange,
}: Props) => {
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
