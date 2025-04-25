import { Navigate } from 'react-router-dom';
import AddHotelRoom from './components/AddHotelRoom';
import HomePage from './components/HomePage';

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
    path: '*',
    element: <Navigate to="/" />,
  },
];

export default routes;