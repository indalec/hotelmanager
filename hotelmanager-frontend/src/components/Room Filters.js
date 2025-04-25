import React from 'react';
import {
    Box,
    Collapse,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button
} from '@mui/material';

const RoomFilters = ({ 
    showFilters,
    filters,
    handleFilterChange,
    applyFilters,
    resetFilters
}) => {
    return (
        <Collapse in={showFilters}>
            <Box sx={{ p: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Availability</InputLabel>
                    <Select
                        name="availability"
                        value={filters.availability}
                        label="Availability"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="true">Available</MenuItem>
                        <MenuItem value="false">Occupied</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Minibar</InputLabel>
                    <Select
                        name="minibar"
                        value={filters.minibar}
                        label="Minibar"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="true">Has Minibar</MenuItem>
                        <MenuItem value="false">No Minibar</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }} size="small">
                    <InputLabel>Room Type</InputLabel>
                    <Select
                        name="roomType"
                        value={filters.roomType}
                        label="Room Type"
                        onChange={handleFilterChange}
                    >
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="SINGLE">Single</MenuItem>
                        <MenuItem value="DOUBLE">Double</MenuItem>
                        <MenuItem value="SUITE">Suite</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" onClick={applyFilters}>
                    Apply Filters
                </Button>
                <Button variant="outlined" onClick={resetFilters}>
                    Clear Filters
                </Button>
            </Box>
        </Collapse>
    );
};

export default RoomFilters;