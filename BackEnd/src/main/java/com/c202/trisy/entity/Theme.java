package com.c202.trisy.entity;

import lombok.Getter;

import javax.persistence.Entity;

@Entity
@Getter
public class Theme {
    private String mainCategory;
    private String middleCategory;
    private String subCategory;
}
