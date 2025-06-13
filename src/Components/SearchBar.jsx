import { useState } from "react";
import logo from "../assets/images/logo.png";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="pt-4">
      <a href="/">
        <img className="relative mx-auto" src={logo} alt="logo" />
      </a>
      <div className="relative mx-auto w-10/12 py-11">
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="py-3 pl-12 border border-gray-200 rounded-full shadow-sm 
                     focus:outline-none focus:ring-2 focus:ring-blue-100 
                     focus:border-transparent w-10/12 bg-stone-100"
        />
        <IoMdSearch
          role="button"
          aria-label="Search"
          className="absolute left-6 top-1/2 transform -translate-y-1/2 
                     text-gray-600 hover:text-blue-600 cursor-pointer z-10"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchBar;
