import { Navigate } from 'react-router-dom';
import AddHotelRoom from './components/AddHotelRoom';
import HomePage from './components/pages/HomePage';
import HotelRoomList from './components/HotelRoomList/HotelRoomList';

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