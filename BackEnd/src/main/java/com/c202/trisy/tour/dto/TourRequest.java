package com.c202.trisy.tour.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class TourRequest {

    class SpotInfo{
        private Long spotId;
        private String spotName;
        private LocalDate date;
    }


    private List<SpotInfo> spotList;



}
