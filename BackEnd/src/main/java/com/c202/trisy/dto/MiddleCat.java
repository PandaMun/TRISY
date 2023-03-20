package com.c202.trisy.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MiddleCat {
    private String mainCode;
    private String mainName;
    private String middleCode;
    private String middleName;
}
