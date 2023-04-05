package com.c202.trisy.tour.dto;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TourDetailsResponse {

    private Long id;
    private String tourName;
    private String location;
    private LocalDate startDate;
    private LocalDate endDate;


    @Getter
    @Builder
    public static class TourScheduleDetail {

        private String spotName;
        private String description;
        private String imageUrl;

        private Long planDate;
        private double lng;
        private double lat;
    }


    private List<TourScheduleDetail> tourDetailsResponseList = new ArrayList<>();

}
