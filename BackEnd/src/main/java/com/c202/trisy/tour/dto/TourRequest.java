package com.c202.trisy.tour.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    public static class SpotInfo {
        private Long spotId;

        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDate planDate;
    }

    private String tourName;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
    private List<SpotInfo> spotInfoList;
}
