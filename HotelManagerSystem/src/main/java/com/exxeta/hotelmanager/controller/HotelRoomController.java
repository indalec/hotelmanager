package com.exxeta.hotelmanager.controller;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import com.exxeta.hotelmanager.service.HotelRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
@RestController
@RequestMapping("/hotel-room")
public class HotelRoomController {

    private final HotelRoomService hotelRoomService;

    @Autowired
    public HotelRoomController(HotelRoomService hotelRoomService) {
        this.hotelRoomService = hotelRoomService;
    }

    @PostMapping("/add")
    public String add(@RequestBody HotelRoom hotelRoom) {
        hotelRoomService.saveHotelRoom(hotelRoom);
        return "New Hotel Room added";
    }

    @GetMapping("/get-all")
    public List<HotelRoom> getAllHotelRooms() {
        return hotelRoomService.getAllHotelRooms();
    }

    @GetMapping("/filter")
    public List<HotelRoom> filterHotelRooms(
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean hasMinibar,
            @RequestParam(required = false) RoomType roomType) {
        return hotelRoomService.getFilteredHotelRooms(isAvailable, hasMinibar, roomType);
    }
}