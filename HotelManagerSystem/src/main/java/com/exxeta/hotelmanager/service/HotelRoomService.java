package com.exxeta.hotelmanager.service;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;

import java.util.List;

public interface HotelRoomService {
    HotelRoom saveHotelRoom(HotelRoom hotelRoom);
    List<HotelRoom> getAllHotelRooms();
    List<HotelRoom> getFilteredHotelRooms(Boolean isAvailable, Boolean hasMinibar, RoomType roomType);
}