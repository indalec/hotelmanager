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
    Typography
} from '@mui/material';
import TextField from '@mui/material/TextField';
import DropdownRoomType from './DropdownRoomType';

export default function AddHotelRoom() {
    const [roomNumber, setRoomNumber] = useState('');
    const [roomType, setRoomType] = useState('');
    const [hasMinibar, setHasMinibar] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

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
                alert('Room added successfully!');
                setRoomNumber('');
                setRoomType('');
                setHasMinibar(false);
                setIsAvailable(true);
            } else {
                const errorData = await response.json();
                alert(`Error adding room: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add room. Please check your connection.');
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

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Add Room
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    );
}