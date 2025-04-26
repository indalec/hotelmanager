import { useState } from 'react';
import { 
  Typography,
  Container,
  Paper,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export default function HomePage() {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckRoom = async () => {
    if (!roomNumber) {
      setError('Please enter a room number');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`http://localhost:8080/hotel-room/get-all`);
      
      if (!response.ok) throw new Error('Failed to fetch rooms');
      const allRooms = await response.json();
      
      const foundRoom = allRooms.find(room => room.roomNumber === parseInt(roomNumber));
      
      if (!foundRoom) {
        setError('Room not found');
        setRoomDetails(null);
      } else {
        setRoomDetails(foundRoom);
      }
    } catch (err) {
      setError(err.message);
      setRoomDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Hotel Manager
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
          <TextField
            label="Enter Room Number"
            variant="outlined"
            type="number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            sx={{ flexGrow: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleCheckRoom}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Check Room'}
          </Button>
        </Box>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        {roomDetails && (
          <List dense>
            <ListItem>
              <ListItemText primary="Room Number" secondary={roomDetails.roomNumber} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Type" 
                secondary={<Chip 
                  label={roomDetails.roomType.toLowerCase()}
                  color={
                    roomDetails.roomType === 'SUITE' ? 'primary' :
                    roomDetails.roomType === 'DOUBLE' ? 'secondary' : 'default'
                  }
                />} 
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Minibar" 
                secondary={roomDetails.hasMinibar ? (
                  <CheckCircleOutlineIcon color="success" />
                ) : (
                  <HighlightOffIcon color="error" />
                )}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Availability" 
                secondary={<Chip
                  label={roomDetails.isAvailable ? "Available" : "Occupied"}
                  color={roomDetails.isAvailable ? "success" : "error"}
                  variant="outlined"
                />}
              />
            </ListItem>
          </List>
        )}
      </Paper>
    </Container>
  );
}