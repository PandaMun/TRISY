package com.c202.trisy.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponse {

    private String title;

    private String content;

    private String memberId;

    private Long tourId;

}
