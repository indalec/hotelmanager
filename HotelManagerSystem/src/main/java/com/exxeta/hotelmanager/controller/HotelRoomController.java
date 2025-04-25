package com.exxeta.hotelmanager.controller;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import com.exxeta.hotelmanager.service.HotelRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    @PutMapping("/update/{roomNumber}")
    public ResponseEntity<String> updateHotelRoom(
            @PathVariable int roomNumber,
            @RequestBody HotelRoom updatedRoom) {
        try {
            HotelRoom result = hotelRoomService.updateHotelRoom(roomNumber, updatedRoom);
            return ResponseEntity.ok("Room " + roomNumber + " updated successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{roomNumber}")
    public ResponseEntity<String> deleteHotelRoom(@PathVariable int roomNumber) {
        try {
            hotelRoomService.deleteHotelRoom(roomNumber);
            return ResponseEntity.ok("Room " + roomNumber + " deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
