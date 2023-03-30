package com.c202.trisy.board.controller;


import com.c202.trisy.board.dto.BoardRequest;
import com.c202.trisy.board.dto.BoardResponse;
import com.c202.trisy.board.service.AwsS3Service;
import com.c202.trisy.board.service.BoardService;
import com.c202.trisy.user.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Pageable;

import java.nio.file.NoSuchFileException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trisy/api/board")
public class BoardController {

    private final BoardService boardService;

    private final AwsS3Service awsS3Service;


    /**
     * 여행 후기 목록 조회
     * @param pageable
     * @return
     */
    @GetMapping
    public ResponseEntity<?> searchBoardList(
            @PageableDefault(sort = "id", direction = Sort.Direction.ASC) Pageable pageable){


        Page<BoardResponse> boardList = boardService.getBoardList(pageable);

        return ResponseEntity.ok(boardList);
    }


    /**
     * 여행 후기 상세 조회
     * @param boardId
     * @return
     */
    @GetMapping("/{boardId}")
    public ResponseEntity<?> searchBoardDetails(@PathVariable String boardId){

        BoardResponse board = boardService.getBoard(Long.parseLong(boardId));

        return ResponseEntity.ok(board);
    }

    /**
     * 여행 후기 작성
     * @param boardRequest
     * @param authentication
     * @return
     */
    @PostMapping
    public ResponseEntity<?> createBoard(@RequestBody BoardRequest boardRequest, Authentication authentication){

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

        System.out.println(boardRequest.getContent());
        boardService.createBoard(principal.getMember().getEmail(), boardRequest); //principal.getMember().getEmail(), boardRequest);

        return ResponseEntity.ok("success");
    }

    /**
     * 이미지 등록
     * @param multipartFile
     * @return
     */
    @PostMapping("/image")
    public ResponseEntity<?> uploadFile(
            @RequestPart(value = "file") MultipartFile multipartFile) {
        try {
            return ResponseEntity.ok(awsS3Service.uploadFile(multipartFile));
        } catch (IllegalAccessException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (NoSuchFileException e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 여행 후기 수정
     * @param boardId
     * @param boardRequest
     * @param authentication
     * @return
     */
    @PutMapping("/{boardId}")
    public ResponseEntity<?> updateBoard(@PathVariable String boardId, @RequestBody BoardRequest boardRequest, Authentication authentication){

        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

        boardService.updateBoard(Long.parseLong(boardId), boardRequest);

        return ResponseEntity.ok("success");
    }


    /**
     * 여행 후기 삭제
     * @param boardId
     * @param authentication
     * @return
     */
    @DeleteMapping("/{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable String boardId, Authentication authentication){

        boardService.deleteBoard(Long.parseLong(boardId));
        return ResponseEntity.ok("success");
    }

}
