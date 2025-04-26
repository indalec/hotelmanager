import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/hotel-room',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const HotelRoomAPI = {
  getAll: () => api.get('/get-all'),
  addRoom: (room: any) => api.post('/add', room),
};