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
    Chip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
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

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/hotel-room/get-all');
                if (!response.ok) throw new Error('Failed to fetch rooms');
                const data = await response.json();
                setRooms(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRooms();
    }, []);

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
                <Typography variant="h5" sx={{ p: 2 }}>
                    Hotel Rooms List
                </Typography>

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
                                                    label="Not available"
                                                    color="error"
                                                    variant="outlined"
                                                />
                                            ) : (
                                                <Chip
                                                    label="Available"
                                                    color="success"
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