package com.exxeta.hotelmanager.service;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import com.exxeta.hotelmanager.repository.HotelRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelRoomServiceImpl implements HotelRoomService {

    private final HotelRoomRepository hotelRoomRepository;

    @Autowired
    public HotelRoomServiceImpl(HotelRoomRepository hotelRoomRepository) {
        this.hotelRoomRepository = hotelRoomRepository;
    }

    @Override
    public HotelRoom saveHotelRoom(HotelRoom hotelRoom) {
        return hotelRoomRepository.save(hotelRoom);
    }

    @Override
    public List<HotelRoom> getAllHotelRooms() {
        return hotelRoomRepository.findAll();
    }

    @Override
    public List<HotelRoom> getFilteredHotelRooms(Boolean isAvailable, Boolean hasMinibar, RoomType roomType) {
        return hotelRoomRepository.findByFilters(isAvailable, hasMinibar, roomType);
    }
}