package com.c202.trisy.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardRequest {

    private String title;

    private String content;

    private Long tourId;

    private String thumbnailUrl;



}
