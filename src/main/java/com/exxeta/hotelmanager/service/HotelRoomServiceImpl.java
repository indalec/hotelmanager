package com.exxeta.hotelmanager.service;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.repository.HotelRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HotelRoomServiceImpl implements HotelRoomService{

    @Autowired
    private HotelRoomRepository hotelRoomRepository;
    @Override
    public HotelRoom saveHotelRoom(HotelRoom hotelRoom) {
        return hotelRoomRepository.save(hotelRoom);
    }
}
