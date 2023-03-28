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

    private int contentId;

    private String mainAddress;

    private String subAddress;

    private double lat;

    private double lng;

    private String spotName;

    @Column(columnDefinition = "LONGTEXT")
    private String spotInfo;

    private String imageUrl;

    private String thumbnailUrl;

    private String zipcode;


    @ManyToOne(fetch = FetchType.LAZY)
    private Theme theme;

    @ManyToOne(fetch = FetchType.LAZY)
    private Region region;




}
