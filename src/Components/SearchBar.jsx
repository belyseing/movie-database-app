import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { IoMdSearch } from "react-icons/io";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query); // Call onSearch only if there's a valid query
    }
  };

  return (
    <div className="pt-4">
      <a href="">
        <img className="relative mx-auto" src={logo} alt="logo" />
      </a>
      <div className="relative mx-auto w-10/12 py-11">
        <input
          type="text"
          placeholder="Search for a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="py-3 pl-12 border-gray-100 rounded-full shadow-sm focus:outline-none focus:ring-2
                  focus:ring-blue-100 focus:border-transparent w-10/12 bg-stone-100"
        />
        <IoMdSearch
          className="absolute left-6 top-1/2 -translate-y-1/3 text-gray-600 hover:text-blue-600 cursor-pointer"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  );
};

export default SearchBar;
