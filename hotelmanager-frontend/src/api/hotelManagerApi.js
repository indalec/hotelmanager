const API_BASE = 'http://localhost:8080/hotel-room';

export const hotelManagerApi = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE}/filter?${query}`);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    return response.json();
  },

  getById: async (roomNumber) => {
    const response = await fetch(`${API_BASE}/get-all`);
    if (!response.ok) throw new Error('Failed to fetch rooms');
    const allRooms = await response.json();
    return allRooms.find(room => room.roomNumber === parseInt(roomNumber));
  },

  create: async (roomData) => {
    const response = await fetch(`${API_BASE}/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData)
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create room');
    }
    return response.json();
  },

  update: async (roomNumber, roomData) => {
    const response = await fetch(`${API_BASE}/update/${roomNumber}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roomData)
    });
    if (!response.ok) throw new Error('Failed to update room');
    return response.json();
  },

  delete: async (roomNumber) => {
    const response = await fetch(`${API_BASE}/delete/${roomNumber}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete room');
    return true;
  }
};