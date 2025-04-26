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
  Grid,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import {
  MeetingRoom,
  Category,
  LocalBar,
  CheckCircle,
  HighlightOff,
  Search
} from '@mui/icons-material';

export default function HomePage() {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckRoom = async () => {
    if (!roomNumber || isNaN(roomNumber)) {
      setError('Please enter a valid room number');
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
        setError(`Room #${roomNumber} not found`);
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
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 600,
        textAlign: 'center',
        mb: 4
      }}>
        Hotel Room Status Check
      </Typography>

      <Paper elevation={3} sx={{ 
        p: 4, 
        mb: 3,
        borderRadius: 2,
      }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            label="Enter Room Number"
            variant="outlined"
            type="number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            InputProps={{
              inputProps: { 
                min: 1,
                style: { textAlign: 'center', fontSize: '1.2rem' }
              }
            }}
          />
          <Button
            variant="contained"
            onClick={handleCheckRoom}
            disabled={loading}
            size="large"
            sx={{ 
              height: '56px',
              px: 4,
              borderRadius: 1,
              fontSize: '1rem'
            }}
          >
            {loading ? <CircularProgress size={24} /> : <><Search sx={{ mr: 1 }}/> Check</>}
          </Button>
        </Stack>

        {error && (
          <Alert severity="error" sx={{ 
            mt: 3,
            alignItems: 'center'
          }}>
            {error}
          </Alert>
        )}

        {roomDetails && (
          <Card elevation={0} sx={{ 
            mt: 4,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2
          }}>
            <CardContent>
              <Grid container spacing={3}>
                {/* Room Number */}
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <MeetingRoom fontSize="large" color="primary"/>
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Room Number
                      </Typography>
                      <Typography variant="h5" fontWeight={600}>
                        #{roomDetails.roomNumber}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>

                {/* Room Type */}
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Category fontSize="large" color="primary"/>
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Room Type
                      </Typography>
                      <Typography variant="h6" fontWeight={500}>
                        {roomDetails.roomType.charAt(0) + 
                         roomDetails.roomType.slice(1).toLowerCase()}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>

                {/* Minibar */}
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <LocalBar fontSize="large" 
                      color={roomDetails.hasMinibar ? "success" : "error"}/>
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Minibar
                      </Typography>
                      <Typography variant="h6" fontWeight={500}>
                        {roomDetails.hasMinibar ? 'Available' : 'Not available'}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>

                {/* Availability */}
                <Grid item xs={12} md={6}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {roomDetails.isAvailable ? (
                      <CheckCircle fontSize="large" color="success"/>
                    ) : (
                      <HighlightOff fontSize="large" color="error"/>
                    )}
                    <div>
                      <Typography variant="subtitle1" color="text.secondary">
                        Status
                      </Typography>
                      <Typography variant="h6" fontWeight={600}
                        sx={{ 
                          color: roomDetails.isAvailable ? 'success.main' : 'error.main'
                        }}>
                        {roomDetails.isAvailable 
                          ? "Available now" 
                          : "Currently occupied"}
                      </Typography>
                    </div>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Paper>
    </Container>
  );
}