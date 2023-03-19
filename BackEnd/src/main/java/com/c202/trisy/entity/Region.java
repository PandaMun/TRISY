package com.c202.trisy.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
public class Region {
    @Id
    private Long id;
    private int siCode;
    private String siName;
    private int guGunCode;
    private String guGunName;
}
