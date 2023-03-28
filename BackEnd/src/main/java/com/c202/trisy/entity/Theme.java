package com.c202.trisy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Theme extends BaseEntity {

    private String subCategoryCode;
    private String mainCategoryName;
    private String mainCategoryCode;

    private String middleCategoryName;
    private String middleCategoryCode;

    private String subCategoryName;

}

