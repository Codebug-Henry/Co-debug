import React from "react";
import { TextField } from "@mui/material";

export default function SearchBar({ setInput, setPage }) {
  const onChangeSearch = (e) => {
    setPage(1);
    setInput(e.target.value);
  };

  return (
    <div>
      <TextField sx={{ margin: 0.5, maxWidth: "30vw"}} onChange={onChangeSearch} type="search" label="Buscar..." variant="outlined" />
    </div>
  );
}