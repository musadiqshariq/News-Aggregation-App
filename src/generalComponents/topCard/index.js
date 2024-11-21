import { Badge, Button, Input } from "antd";
import React from "react";

const { Search } = Input;

export const TopCard = ({
  heading,
  handleSearch,
  onButtomClick,
  buttonText = "Apply Filters",
  totalRecords,
}) => {
  return (
    <div className="bg-white p-5 rounded-lg sm:flex shadow justify-between items-center">
      <Badge count={totalRecords} overflowCount={1000000}>
        <p className="text-xl">{heading}</p>
      </Badge>

      <div className="flex mt-2 sm:mt-0">
        <Search
          placeholder="Search"
          allowClear
          style={{
            width: 300,
          }}
          onChange={(e) => {
            handleSearch && handleSearch(e.target.value);
          }}
        />
        <Button
          className="bg-black text-white ml-2"
          variant="solid"
          onClick={onButtomClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
