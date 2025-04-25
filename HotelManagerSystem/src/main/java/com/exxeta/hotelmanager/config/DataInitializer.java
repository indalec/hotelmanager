package com.exxeta.hotelmanager.config;

import com.exxeta.hotelmanager.model.HotelRoom;
import com.exxeta.hotelmanager.model.RoomType;
import com.exxeta.hotelmanager.repository.HotelRoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initDatabase(HotelRoomRepository repository) {
        return args -> {
            // Check if rooms already exist
            if (repository.count() == 0) {
                // Double room with minibar
                repository.save(
                        new HotelRoom(
                                101,
                                RoomType.DOUBLE,
                                true
                        )
                );

                // Single room with minibar
                repository.save(
                        new HotelRoom(
                                202,
                                RoomType.SINGLE,
                                true
                        )
                );

                // Suite without minibar
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