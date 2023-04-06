package com.c202.trisy.tour.dto;

import com.c202.trisy.entity.TourSpot;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TourDetailsCoordinateResponse {

    private Long id;

    private int contentId;

    private String spotInfo;

    private String imageUrl;

    private String mainAddress;

    private String subAddress;

    private String spotName;

    private String zipCode;

    private double  lng;

    private double lat;



    private TourDetailsCoordinateResponse toDto(TourSpot tourSpot){
        return TourDetailsCoordinateResponse.builder()
                .contentId(tourSpot.getContentId())
                .id(tourSpot.getId())
                .spotInfo(tourSpot.getSpotInfo())
                .imageUrl(tourSpot.getImageUrl())
                .mainAddress(tourSpot.getMainAddress())
                .subAddress(tourSpot.getSubAddress())
                .lat(tourSpot.getLat())
                .lng(tourSpot.getLng())
                .spotName(tourSpot.getSpotName())
                .zipCode(tourSpot.getZipcode())
                .build();

    }
}
