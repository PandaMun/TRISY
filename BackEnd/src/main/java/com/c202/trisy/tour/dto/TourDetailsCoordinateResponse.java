package com.c202.trisy.tour.dto;

import com.c202.trisy.entity.TourSpot;
import lombok.*;

import java.util.ArrayList;
import java.util.List;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class TourDetailsCoordinateResponse {


    private String message;
    private int code;

    private List<spotInfo> result;


    @Getter
    @Builder
    public static class spotInfo {
        private Long id;

        private String spot_info;

        private String image_url;

        private String main_address;

        private String spot_name;

        private String thumbnail_url;

        private double lng;

        private double lat;


    }
}
