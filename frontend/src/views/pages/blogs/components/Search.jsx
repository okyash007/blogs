import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <div className="flex p-5 bg-[#ffffff1a] rounded-2xl">
      <input
        className="text-2xl flex-grow bg-transparent focus:outline-none"
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
