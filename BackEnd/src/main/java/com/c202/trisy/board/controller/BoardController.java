package com.c202.trisy.board.controller;


import com.c202.trisy.board.dto.BoardRequest;
import com.c202.trisy.board.dto.BoardResponse;
import com.c202.trisy.board.service.BoardService;
import com.c202.trisy.entity.Member;
import com.c202.trisy.user.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trisy/api/board")
public class BoardController {

    private BoardService boardService;



    //여행 후기 목록 조회(아이디)
    @GetMapping
    public ResponseEntity<?> searchBoardList(
            @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable){


        List<BoardResponse> boardList = boardService.getBoardList(pageable);

        return ResponseEntity.ok(boardList);
    }


    //여행 후기 상세 조회
    @GetMapping("/{boardId}")
    public ResponseEntity<?> searchBoardDetails(@PathVariable String boardId){

        BoardResponse board = boardService.getBoard(Long.parseLong(boardId));

        return ResponseEntity.ok(board);
    }

    //여행 후기 작성
    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody BoardRequest boardRequest, Authentication authentication){

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

        boardService.createBoard(principal.getMember().getEmail(), boardRequest);

        return ResponseEntity.ok("success");
    }

    @PostMapping("/{boardId}/image")
    public ResponseEntity<?> uploadImage(@RequestBody MultipartFile file){

        //이미지를 올려주면 해당 url를 리턴
        return null;
    }


    //여행 후기 수정
    @PutMapping("/{boardId}")
    public ResponseEntity<?> updateBoard(@PathVariable String boardId, @RequestBody BoardRequest boardRequest, Authentication authentication){

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

        boardService.updateBoard(Long.parseLong(boardId), boardRequest);

        return ResponseEntity.ok("success");
    }


    //여행 후기 삭제
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable String boardId, Authentication authentication){

        boardService.deleteBoard(Long.parseLong(boardId));
        return ResponseEntity.ok("success");
    }

}
