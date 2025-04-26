package com.exxeta.hotelmanager.controller;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import com.exxeta.hotelmanager.service.HotelRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//Maps and handles REST API requests to create, read, update, and delete hotel rooms.

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}) //Database and React URLs
@RestController
@RequestMapping("/hotel-room")
public class HotelRoomController {

    private final HotelRoomService hotelRoomService;

    @Autowired
    public HotelRoomController(HotelRoomService hotelRoomService) {
        this.hotelRoomService = hotelRoomService;
    }

    // Adds a new hotel room
    @PostMapping("/add")
    public String add(@RequestBody HotelRoom hotelRoom) {
        hotelRoomService.saveHotelRoom(hotelRoom);
        return "New Hotel Room added";
    }

    // Retrieves all hotel rooms
    @GetMapping("/get-all")
    public List<HotelRoom> getAllHotelRooms() {
        return hotelRoomService.getAllHotelRooms();
    }

    // Retrieves filtered and sorted list of hotel rooms
    @GetMapping("/filter")
    public List<HotelRoom> filterHotelRooms(
            @RequestParam(required = false) Boolean isAvailable,
            @RequestParam(required = false) Boolean hasMinibar,
            @RequestParam(required = false) RoomType roomType,
            @RequestParam(defaultValue = "roomNumber") String sortBy,
            @RequestParam(defaultValue = "asc") String sortOrder) {
        return hotelRoomService.getFilteredHotelRooms(
                isAvailable,
                hasMinibar,
                roomType,
                sortBy,
                sortOrder
        );
    }

    // Updates an existing hotel room by room number
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

    // Deletes a hotel room by room number
    @DeleteMapping("/delete/{roomNumber}")
    public ResponseEntity<String> deleteHotelRoom(@PathVariable int roomNumber) {
        try {
            hotelRoomService.deleteHotelRoom(roomNumber);
            return ResponseEntity.ok("Room " + roomNumber + " deleted successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // Adds a batch (JSON) of hotel rooms (for development/testing purposes)
    @PostMapping("/add-batch")
    public ResponseEntity<String> addBatch(@RequestBody List<HotelRoom> hotelRooms) {
        try {
            hotelRoomService.saveAllHotelRooms(hotelRooms);
            return ResponseEntity.ok("Added " + hotelRooms.size() + " rooms successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding rooms");
        }
    }
}
