package com.c202.trisy.entity;

import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
@Getter
public class Theme{
    @Id
    private String subCategoryCode;
    private String mainCategoryName;
    private String mainCategoryCode;

    private String middleCategoryName;
    private String middleCategoryCode;

    private String subCategoryName;

}

