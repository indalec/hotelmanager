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

    @Override
    public HotelRoom updateHotelRoom(int roomNumber, HotelRoom updatedRoom) {
        return hotelRoomRepository.findById(roomNumber)
                .map(existingRoom -> {
                    existingRoom.setRoomType(updatedRoom.getRoomType());
                    existingRoom.setHasMinibar(updatedRoom.isHasMinibar());
                    existingRoom.setAvailable(updatedRoom.isAvailable());
                    return hotelRoomRepository.save(existingRoom);
                })
                .orElseThrow(() -> new RuntimeException("Room not found with number: " + roomNumber));
    }

    @Override
    public void deleteHotelRoom(int roomNumber) {
        if (hotelRoomRepository.existsById(roomNumber)) {
            hotelRoomRepository.deleteById(roomNumber);
        } else {
            throw new RuntimeException("Room not found with number: " + roomNumber);
        }
    }
}