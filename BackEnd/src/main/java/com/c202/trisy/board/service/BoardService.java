package com.c202.trisy.board.service;

import com.c202.trisy.board.dto.BoardRequest;
import com.c202.trisy.board.dto.BoardResponse;

import org.springframework.data.domain.Pageable;
import java.util.List;

public interface BoardService {

    List<BoardResponse> getBoardList(Pageable pageable);

    BoardResponse getBoard(Long boardId);

    void createBoard(String memberEmail, BoardRequest boardRequest);

    void updateBoard(Long boardId, BoardRequest boardRequest);

    void deleteBoard(Long boardId);
}
