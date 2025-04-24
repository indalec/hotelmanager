package com.exxeta.hotelmanager.controller;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.service.HotelRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hotel-room")
public class HotelRoomController {
    @Autowired
    private HotelRoomService hotelRoomService;

    @PostMapping("/add")
    public  String add(@RequestBody HotelRoom hotelRoom){
        hotelRoomService.saveHotelRoom(hotelRoom);
        return "New Hotel Room added";
    }
}
