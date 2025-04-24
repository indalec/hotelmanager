package com.exxeta.hotelmanager.model;


import jakarta.persistence.*;

@Entity
@Table(name = "hotel_rooms")
public class HotelRoom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_number", nullable = false, unique = true)
    private int roomNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "room_type", nullable = false)
    private RoomType roomType;

    @Column(name = "has_minibar", nullable = false)
    private boolean hasMinibar;


    public HotelRoom() {}

    public HotelRoom(int roomNumber, RoomType roomType, boolean hasMinibar) {
        this.roomNumber = roomNumber;
        this.roomType = roomType;
        this.hasMinibar = hasMinibar;
    }


    public Long getId() {
        return id;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
    }

    public boolean isHasMinibar() {
        return hasMinibar;
    }

    public void setHasMinibar(boolean hasMinibar) {
        this.hasMinibar = hasMinibar;
    }
}
