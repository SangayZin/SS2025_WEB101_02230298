// components/SearchBar.js

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full p-3 rounded-md shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
