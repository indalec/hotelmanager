import { useState } from 'react';
import { 
  Box,
  Container,
  Typography,
  Paper,
  useMediaQuery
} from '@mui/material';
import CheckRoomForm from './CheckRoomForm';

import { hotelManagerApi } from '../../api/hotelManagerApi';

export default function HomePage() {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomDetails, setRoomDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const isMobile = useMediaQuery('(max-width:900px)');

  const handleCheckRoom = async () => {
    try {
      const foundRoom = await hotelManagerApi.getById(roomNumber);
      if (!foundRoom) throw new Error(`Room #${roomNumber} not found`);
      setRoomDetails(foundRoom);
      setError('');
    } catch (err) {
      setError(err.message);
      setRoomDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
       {/* Form Section */}
      <Box sx={{ 
        flex: 1, 
        p: 4,
        marginRight: 9,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'background.paper',
        zIndex: 1 
      }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h1" gutterBottom sx={{ 
            fontWeight: 600,
            mb: 4,
            textAlign: 'center'
          }}>
            Room Status Check
          </Typography>
          
          <Paper elevation={3} sx={{ 
            p: 4,
            borderRadius: 2,
            width: '100%'
          }}>
            <CheckRoomForm 
              roomNumber={roomNumber}
              setRoomNumber={setRoomNumber}
              handleCheckRoom={handleCheckRoom}
              loading={loading}
              error={error}
              roomDetails={roomDetails}
            />
          </Paper>
        </Container>
      </Box>

      {/* Image Section */}
      <Box sx={{ 
        flex: 2,
        position: 'relative',
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${process.env.PUBLIC_URL}/images/hotel-reception.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: 'white',
          p: 4
        }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700,
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: 4,
            fontSize: { xs: '2rem', md: '3.5rem' }
          }}>
            eXXellent Nights!
          </Typography>
          <Typography variant="h5" sx={{
            fontStyle: 'italic',
            letterSpacing: 1,
            fontSize: { xs: '1.25rem', md: '1.5rem' }
          }}>
            Your Perfect Stay Awaits
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}