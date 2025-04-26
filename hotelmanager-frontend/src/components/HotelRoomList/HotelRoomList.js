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
    Box,
    
    IconButton,
    Checkbox,
    Switch
} from '@mui/material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';

import SortableTableHeader from './SortableHeader';
import RoomFilters from './RoomFilters';


const columns = [
    { id: 'roomNumber', label: 'Room Number', minWidth: 100, sortable: true },
    { id: 'roomType', label: 'Room Type', minWidth: 150, sortable: true },
    { id: 'hasMinibar', label: 'Minibar', minWidth: 100, sortable: true },
    { id: 'isAvailable', label: 'Availability', minWidth: 120, sortable: true },
    { id: 'actions', label: 'Actions', minWidth: 130, sortable: false }
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
    const [editingRoomNumber, setEditingRoomNumber] = useState(null);
    const [editedRoom, setEditedRoom] = useState({});
    const [sortConfig, setSortConfig] = useState({
        field: 'roomNumber',
        direction: 'asc'
    });

    const fetchRooms = async (params = {}) => {
        try {
            const queryParams = {
                ...params,
                sortBy: sortConfig.field,
                sortOrder: sortConfig.direction
            };
            
            const query = new URLSearchParams(queryParams).toString();
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
    }, [sortConfig.field, sortConfig.direction]);

    const handleSort = (field) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field 
                ? prev.direction === 'asc' ? 'desc' : 'asc'
                : 'asc'
        }));
    };


    const handleEditClick = (room) => {
        setEditingRoomNumber(room.roomNumber);
        setEditedRoom({
            roomType: room.roomType,
            hasMinibar: room.hasMinibar,
            isAvailable: room.isAvailable
        });
    };

    const handleCancelEdit = () => {
        setEditingRoomNumber(null);
        setEditedRoom({});
    };

    const handleSaveEdit = async (roomNumber) => {
        try {
            const response = await fetch(`http://localhost:8080/hotel-room/update/${roomNumber}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editedRoom)
            });

            if (response.ok) {
                const updatedRooms = rooms.map(room => 
                    room.roomNumber === roomNumber ? { ...room, ...editedRoom } : room
                );
                setRooms(updatedRooms);
                setEditingRoomNumber(null);
            } else {
                alert('Error updating room');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to update room');
        }
    };

    const handleDelete = async (roomNumber) => {
        if (window.confirm(`Are you sure you want to delete room ${roomNumber}?`)) {
            try {
                const response = await fetch(`http://localhost:8080/hotel-room/delete/${roomNumber}`, {
                    method: 'DELETE'
                });
                
                if (response.ok) {
                    setRooms(rooms.filter(room => room.roomNumber !== roomNumber));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete room');
            }
        }
    };

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

    const renderTableCell = (room, column) => {
        const isEditing = editingRoomNumber === room.roomNumber;
        
        switch (column.id) {
            case 'roomType':
                return isEditing ? (
                    <FormControl size="small" fullWidth>
                        <Select
                            value={editedRoom.roomType}
                            onChange={(e) => setEditedRoom({...editedRoom, roomType: e.target.value})}
                        >
                            <MenuItem value="SINGLE">Single</MenuItem>
                            <MenuItem value="DOUBLE">Double</MenuItem>
                            <MenuItem value="SUITE">Suite</MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    <Chip
                        label={room.roomType.charAt(0) + room.roomType.slice(1).toLowerCase()}
                        color={
                            room.roomType === 'SUITE' ? 'primary' :
                            room.roomType === 'DOUBLE' ? 'secondary' : 'default'
                        }
                    />
                );
                
            case 'hasMinibar':
                return isEditing ? (
                    <Checkbox
                        checked={editedRoom.hasMinibar}
                        onChange={(e) => setEditedRoom({...editedRoom, hasMinibar: e.target.checked})}
                        color="primary"
                    />
                ) : (
                    room.hasMinibar ? (
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
                    )
                );
                
            case 'isAvailable':
                return isEditing ? (
                    <Switch
                        checked={editedRoom.isAvailable}
                        onChange={(e) => setEditedRoom({...editedRoom, isAvailable: e.target.checked})}
                        color="primary"
                    />
                ) : (
                    <Chip
                        label={room.isAvailable ? "Available" : "Occupied"}
                        color={room.isAvailable ? "success" : "error"}
                        variant="outlined"
                    />
                );
                
            case 'actions':
                return (
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {isEditing ? (
                            <>
                                <IconButton onClick={() => handleSaveEdit(room.roomNumber)}>
                                    <SaveIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={handleCancelEdit}>
                                    <CancelIcon color="error" />
                                </IconButton>
                            </>
                        ) : (
                            <>
                                <IconButton onClick={() => handleEditClick(room)}>
                                    <EditIcon color="primary" />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(room.roomNumber)}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            </>
                        )}
                    </Box>
                );
                
            default:
                return room[column.id];
        }
    };

    if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;
    if (error) return <Alert severity="error" sx={{ margin: 2 }}>{error}</Alert>;

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
                    <Typography variant="h5">
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

               

                <RoomFilters 
    showFilters={showFilters}
    filters={filters}
    handleFilterChange={handleFilterChange}
    applyFilters={applyFilters}
    resetFilters={resetFilters}
/>

                <TableContainer sx={{ maxHeight: 650 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <SortableTableHeader
                                        key={column.id}
                                        column={column}
                                        onSort={handleSort}
                                        sortConfig={sortConfig}
                                    />
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rooms
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((room) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={room.roomNumber}>
                                        {columns.map((column) => (
                                            <TableCell key={column.id} align="left">
                                                {renderTableCell(room, column)}
                                            </TableCell>
                                        ))}
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