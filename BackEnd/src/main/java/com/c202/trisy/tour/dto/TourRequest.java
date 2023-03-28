package com.c202.trisy.tour.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TourRequest {

    @Getter
    @Setter
    public class SpotInfo {
        private Long spotId;

        private LocalDateTime planDateTime;
    }

    private String tourName;
    private LocalDate startDate;
    private LocalDate endDate;
    private List<SpotInfo> spotInfoList;
}
