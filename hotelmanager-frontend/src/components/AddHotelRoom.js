import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper, Button, FormControlLabel, Checkbox, Stack } from '@mui/material';
import DropdownRoomType from './DropdownRoomType';

export default function AddHotelRoom() {
  const paperStyle = { padding: '20px 20px', width: 600, margin: "20px auto" };
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [hasMinibar, setHasMinibar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hotelRoom = {
      roomNumber: parseInt(roomNumber),
      roomType,
      hasMinibar
    };

    try {
      const response = await fetch('http://localhost:8080/hotel-room/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotelRoom),
      });

      if (response.ok) {
        alert('Room added successfully!');
        setRoomNumber('');
        setRoomType('');
        setHasMinibar(false);
      } else {
        alert('Error adding room');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add room');
    }
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 style={{ marginBottom: '20px' }}>Add Hotel Room</h1>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          autoComplete="off"
        >
          <Stack spacing={3}>
            <TextField
              label="Room Number"
              variant="outlined"
              type="number"
              required
              fullWidth
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
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

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Add Room
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}