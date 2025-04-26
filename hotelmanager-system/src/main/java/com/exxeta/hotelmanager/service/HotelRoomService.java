package com.exxeta.hotelmanager.service;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;

import java.util.List;

public interface HotelRoomService {
    HotelRoom saveHotelRoom(HotelRoom hotelRoom);
    List<HotelRoom> getAllHotelRooms();
    HotelRoom updateHotelRoom(int roomNumber, HotelRoom updatedRoom);
    void deleteHotelRoom(int roomNumber);
    void saveAllHotelRooms(List<HotelRoom> hotelRooms);

    List<HotelRoom> getFilteredHotelRooms(
            Boolean isAvailable,
            Boolean hasMinibar,
            RoomType roomType,
            String sortBy,
            String sortOrder
    );
}