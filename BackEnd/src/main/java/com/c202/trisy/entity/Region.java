package com.c202.trisy.entity;

import lombok.Getter;

import javax.persistence.Entity;

@Entity
@Getter
public class Region {
    private int id;
    private int siCode;
    private String siName;
    private int guGunCode;
    private String guGunName;
}
