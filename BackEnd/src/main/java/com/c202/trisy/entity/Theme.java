package com.c202.trisy.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Theme {
    @Id
    private Long id;
    private String mainCategory;
    private String middleCategory;
    private String subCategory;

//    @OneToOne(mappedBy = "theme")
//    private TourSpot tourSpot;
}

