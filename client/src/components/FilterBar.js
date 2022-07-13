import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function FilterBar({ sort, setSort, setPage }) {
  const handleSort = (e) => {
    e.preventDefault();
    setPage(1);
    setSort(e.target.value);
  };

  return (
    <div>
      <FormControl fullWidth sx={{ margin: 0.5 }}>
        <InputLabel>Filtrar</InputLabel>
        <Select value={sort} label="Filtrar" onChange={handleSort}>
          <MenuItem value="All">Todas las preguntas</MenuItem>
          <MenuItem value="true">Respondidas</MenuItem>
          <MenuItem value="false">No Respondidas</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
