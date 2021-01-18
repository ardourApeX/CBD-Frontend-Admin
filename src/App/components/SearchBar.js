import { Input } from "antd";
import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <Input
      onChange={(e) => onChange(e.target.value)}
      type="search"
      placeholder="Search..."
      style={{
        height: "60%",
        width: "20%",
        border: "1px solid black",
        marginBottom: "30px",
      }}
    />
  );
};

export default SearchBar;
