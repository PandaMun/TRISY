package com.c202.trisy.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Entity
public class TourSpot extends BaseEntity{


    private String mainAddress;

    private String subAddress;

    private double lat;

    private double lng;

    private String spotName;

    private String spotInfo;

    private String imageUrl;

    private String thumbnailUrl;

    private int zipcode;

    private String phoneNumber;


    @ManyToOne(fetch = FetchType.LAZY)
    private Theme theme;


    @ManyToOne(fetch = FetchType.LAZY)
    private Region region;




}
