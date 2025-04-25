import React, { useState, useEffect } from 'react';
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    CircularProgress,
    Alert,
    Chip,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    Collapse
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Tooltip } from '@mui/material';

const columns = [
    { id: 'roomNumber', label: 'Room Number', minWidth: 100 },
    { id: 'roomType', label: 'Room Type', minWidth: 120 },
    { id: 'hasMinibar', label: 'Minibar', minWidth: 100 },
    { id: 'isAvailable', label: 'Availability', minWidth: 120 },
];

export default function HotelRoomList() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        availability: 'all',
        minibar: 'all',
        roomType: 'all'
    });

    const fetchRooms = async (params = {}) => {
        try {
            const query = new URLSearchParams(params).toString();
            const response = await fetch(`http://localhost:8080/hotel-room/filter?${query}`);
            if (!response.ok) throw new Error('Failed to fetch rooms');
            const data = await response.json();
            setRooms(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const applyFilters = () => {
        const params = {};
        if (filters.availability !== 'all') params.isAvailable = filters.availability;
        if (filters.minibar !== 'all') params.hasMinibar = filters.minibar;
        if (filters.roomType !== 'all') params.roomType = filters.roomType;

        setLoading(true);
        fetchRooms(params);
    };

    const resetFilters = () => {
        setFilters({
            availability: 'all',
            minibar: 'all',
            roomType: 'all'
        });
        setLoading(true);
        fetchRooms();
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
    if (error) return <Alert severity="error" sx={{ margin: 2 }}>{error}</Alert>;

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Typography variant="h4">
                        Hotel Rooms List
                    </Typography>
                    <Button
                        variant="outlined"
                        startIcon={<FilterListIcon />}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        {showFilters ? 'Hide Filters' : 'Filter Rooms'}
                    </Button>
                </Box>

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

                <TableContainer sx={{ maxHeight: 600 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align="left"
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((room) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={room.roomNumber}>
                                        <TableCell>{room.roomNumber}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={room.roomType.charAt(0) + room.roomType.slice(1).toLowerCase()}
                                                color={
                                                    room.roomType === 'SUITE' ? 'primary' :
                                                        room.roomType === 'DOUBLE' ? 'secondary' : 'default'
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            {room.hasMinibar ? (
                                                <Tooltip title="Minibar Available">
                                                    <CheckCircleOutlineIcon
                                                        color="success"
                                                        sx={{ fontSize: 28, verticalAlign: 'middle', mr: 1 }}
                                                    />
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="No Minibar">
                                                    <HighlightOffIcon
                                                        color="error"
                                                        sx={{ fontSize: 28, verticalAlign: 'middle', mr: 1 }}
                                                    />
                                                </Tooltip>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {room.isAvailable ? (
                                                <Chip
                                                label="Available"
                                                color="success"
                                                variant="outlined"
                                            />
                                            ) : (
                                                
                                                <Chip
                                                    label="Occupied"
                                                    color="error"
                                                    variant="outlined"
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[10, 25, 50]}
                    component="div"
                    count={rooms.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Container>
    );
}