import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ViewRoomsButton = ({ sx }) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => navigate('/view-rooms')}
      sx={{
        mt: 2,
        ...sx
      }}
    >
      View All Rooms
    </Button>
  );
};

export default ViewRoomsButton;