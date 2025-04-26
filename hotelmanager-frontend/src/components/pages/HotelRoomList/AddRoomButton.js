import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddRoomButton = ({ sx }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => navigate('/add-hotel-room')}
      sx={{ 
        mt: 2,
        ...sx 
      }}
    >
      Add New Room
    </Button>
  );
};

export default AddRoomButton;