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

    private String lat;

    private String lng;

    private String phone;

    private String spotInfo;

    private String spotName;

    private String zipcode;

    private String image;

    @OneToOne
    @JoinColumn(name = "theme_id")
    private Theme theme;

    @OneToOne
    @JoinColumn(name = "region_id")
    private Region region;




}
