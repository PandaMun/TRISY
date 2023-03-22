package com.c202.trisy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Spot {
    @Id
    private int contentId;
    private String mainAddress;
    private String subAddress;
    private double mapX;
    private double mapY;
    private String imageUrl;
    private String thumbnailUrl;
    private String zipCode;
    private String title;
    @ManyToOne(fetch = FetchType.LAZY)
    private Region region;

    @ManyToOne(fetch = FetchType.LAZY)
    private Theme theme;



}
