package com.exxeta.hotelmanager.config;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import com.exxeta.hotelmanager.repository.HotelRoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//Initializes the database with example rooms at application startup(in case the DB is empty).

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(HotelRoomRepository repository) {
        return args -> {
            if (repository.count() == 0) {
                repository.save(
                        new HotelRoom(
                                101,
                                RoomType.DOUBLE,
                                true
                        )
                );

                repository.save(
                        new HotelRoom(
                                202,
                                RoomType.SINGLE,
                                true
                        )
                );

                repository.save(
                        new HotelRoom(
                                303,
                                RoomType.SUITE,
                                false
                        )
                );
            }
        };
    }
}