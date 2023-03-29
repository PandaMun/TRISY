package com.c202.trisy.board.dto;

import com.c202.trisy.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BoardResponse {

    private Long id;

    private String title;

    private String content;

    private String memberId;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    private String thumbnailUrl;

    private Long tourId;

    public Page<BoardResponse> toDtoList(Page<Board> faqPage){
        Page<BoardResponse> boardResponsePage = faqPage.map(board -> BoardResponse.builder()
                .id(board.getId())
                .title(board.getTitle())
                .content(board.getContent())
                .createdTime(board.getCreatedTime())
                .tourId(board.getTourSchedule().getId())
                .updatedTime(board.getUpdatedTime())
                .thumbnailUrl(board.getThumbnailUrl())
                .memberId(board.getMember().getEmail())
                .build());

        return boardResponsePage;
    }

}
