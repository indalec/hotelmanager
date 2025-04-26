import * as React from 'react';
import { useState } from 'react';
import {
    Container,
    Paper,
    Button,
    FormControlLabel,
    Checkbox,
    Stack,
    Box,
    Typography,
    Snackbar,
    Alert
} from '@mui/material';
import TextField from '@mui/material/TextField';
import DropdownRoomType from './DropdownRoomType';
import ViewRoomsButton from './ViewRoomsButton';

export default function AddHotelRoom() {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [hasMinibar, setHasMinibar] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hotelRoom = {
            roomNumber: parseInt(roomNumber),
            roomType,
            hasMinibar,
            isAvailable
        };

        try {
            const response = await fetch('http://localhost:8080/hotel-room/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hotelRoom),
            });

            if (response.ok) {
                setSuccessOpen(true);
                setRoomNumber('');
                setRoomType('');
                setHasMinibar(false);
                setIsAvailable(true);
            } else {
                const errorData = await response.json();
                // Handle duplicate room number error
                if (response.status === 409) {
                    setMessage(`Room ${roomNumber} already exists!`);
                } else {
                    setMessage(`Error: ${errorData.message || response.statusText}`);
                }
                setErrorOpen(true);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Failed to add room. Please check your connection.');
            setErrorOpen(true);
        }
    };

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600, mx: 'auto' }}>
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h1" gutterBottom>
                        Add Hotel Room
                    </Typography>
                </Box>

                <Box component="form" onSubmit={handleSubmit}>
                    <Stack spacing={3}>
                        <TextField
                            label="Room Number"
                            variant="outlined"
                            type="number"
                            required
                            fullWidth
                            value={roomNumber}
                            onChange={(e) => setRoomNumber(e.target.value)}
                            inputProps={{ min: 1 }}
                        />

                        <DropdownRoomType 
                            value={roomType}
                            onChange={(e) => setRoomType(e.target.value)}
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hasMinibar}
                                    onChange={(e) => setHasMinibar(e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Has Minibar"
                        />

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={!isAvailable}
                                    onChange={(e) => setIsAvailable(!e.target.checked)}
                                    color="primary"
                                />
                            }
                            label="Mark as Occupied"
                        />

                        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Add Room
                            </Button>
                            <ViewRoomsButton fullWidth />
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            
            <Snackbar
                open={successOpen}
                autoHideDuration={6000}
                onClose={() => setSuccessOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    severity="success" 
                    onClose={() => setSuccessOpen(false)}
                    sx={{ width: '100%' }}
                >
                    Room added successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorOpen}
                autoHideDuration={6000}
                onClose={() => setErrorOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    severity="error"
                    onClose={() => setErrorOpen(false)}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </Container>
    );
}