import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import React from "react";

const SearchBar = ({ onChange }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid black",
          alignItems: "center",
          padding: 0,
        }}
      >
        <SearchOutlined />
        <input
          onChange={(e) => onChange(e.target.value)}
          type="search"
          placeholder="Search..."
          style={{
            height: "60%",
            border: "none ",
            // marginBottom: "30px",
            // marginTop: "20px",
            padding: "10px",
            outline: "none !important",
            backgroundColor: "#f4f4fc",
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
