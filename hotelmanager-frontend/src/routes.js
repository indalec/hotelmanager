import { Navigate } from 'react-router-dom';
import AddHotelRoom from './pages/AddHotelRoom/AddHotelRoom';
import HomePage from './pages/HomePage/HomePage';
import HotelRoomList from './pages/ViewHotelRooms/ViewHotelRooms';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/add-hotel-room',
    element: <AddHotelRoom />,
  },
  {
    path: '/view-rooms',
    element: <HotelRoomList />,
  },
  {
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default routes;