package com.exxeta.hotelmanager.repository;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

//Interface for accessing hotel room data using Spring Data JPA.

@Repository
public interface HotelRoomRepository extends JpaRepository<HotelRoom, Integer> {


    //Custom Query:
    // Dynamically filters rooms by availability, minibar presence, and room type.
    // Null parameters are ignored in filtering (e.g., null isAvailable shows all).
    // Supports custom sorting of results. Combines criteria with AND logic.
    @Query("SELECT h FROM HotelRoom h WHERE " +
            "(?1 IS NULL OR h.isAvailable = ?1) AND " +
            "(?2 IS NULL OR h.hasMinibar = ?2) AND " +
            "(?3 IS NULL OR h.roomType = ?3)")
    List<HotelRoom> findByFilters(
            Boolean isAvailable,
            Boolean hasMinibar,
            RoomType roomType,
            Sort sort
    );
}