import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function DropdownRoomType({ value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel id="room-type-label">Room Type</InputLabel>
      <Select
        labelId="room-type-label"
        label="Room Type"
        value={value}
        onChange={onChange}
        required
      >
        <MenuItem value="SINGLE">Single</MenuItem>
        <MenuItem value="DOUBLE">Double</MenuItem>
        <MenuItem value="SUITE">Suite</MenuItem>
      </Select>
    </FormControl>
  );
}