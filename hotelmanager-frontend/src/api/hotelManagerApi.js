const API_BASE = 'http://localhost:8080/hotel-room';


const handleResponse = async (response) => {
  const text = await response.text();
  try {
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) {
      const error = data?.message || data || response.statusText;
      return Promise.reject(new Error(error));
    }
    return data;
  } catch (e) {
    if (!response.ok) {
      return Promise.reject(new Error(text || response.statusText));
    }
    return text;
  }
};

export const hotelManagerApi = {
  getAll: async (params = {}) => {
    try {
      const query = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE}/filter?${query}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to fetch rooms: ${error.message}`);
    }
  },

  getById: async (roomNumber) => {
    try {
      const response = await fetch(`${API_BASE}/get-all`);
      const allRooms = await handleResponse(response);
      const foundRoom = allRooms.find(room => room.roomNumber === parseInt(roomNumber));
      if (!foundRoom) throw new Error(`Room ${roomNumber} not found`);
      return foundRoom;
    } catch (error) {
      throw new Error(`Failed to fetch room: ${error.message}`);
    }
  },

  create: async (roomData) => {
    try {
      const response = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to create room: ${error.message}`);
    }
  },

  update: async (roomNumber, roomData) => {
    try {
      const response = await fetch(`${API_BASE}/update/${roomNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomData)
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(`Failed to update room: ${error.message}`);
    }
  },

  delete: async (roomNumber) => {
    try {
      const response = await fetch(`${API_BASE}/delete/${roomNumber}`, {
        method: 'DELETE'
      });
      await handleResponse(response);
      return true;
    } catch (error) {
      throw new Error(`Failed to delete room: ${error.message}`);
    }
  }
};