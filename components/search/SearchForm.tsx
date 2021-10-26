import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import tailwind from "tailwind-rn";

const SearchForm = ({ onChangeHandler }) => {
  const [value, setValue] = useState("");

  return (
    <TextInput
      value={value}
      style={tailwind(
        "shadow border rounded w-full py-2 px-3 text-gray-700 mb-3"
      )}
      onChange={(event) => {
        setValue(event.target.value);
        onChangeHandler(event.target.value);
      }}
    />
  );
};

export default SearchForm;
