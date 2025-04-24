package com.exxeta.hotelmanager.service;

import com.exxeta.hotelmanager.model.HotelRoom;

import java.util.List;

public interface HotelRoomService {
    public HotelRoom saveHotelRoom(HotelRoom hotelRoom);
    public List<HotelRoom> getAllHotelRooms();
}