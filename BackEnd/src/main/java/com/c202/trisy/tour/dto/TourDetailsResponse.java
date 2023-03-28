package com.c202.trisy.tour.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TourDetailsResponse {

    private String spotName;
    private String description;
    private String imageUrl;

    private LocalDateTime planDateTime;
    private double lng;
    private double lat;

}
