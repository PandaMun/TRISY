package com.c202.trisy.tour.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class TourResponse {

        private Long id;
        private String tourName;

        private String location;
        private LocalDate startDate;
        private LocalDate endDate;



}
