package com.c202.trisy.board.controller;


import com.c202.trisy.board.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trisy/api/board")
public class BoardController {

    private BoardService boardService;



    //여행 후기 목록 조회



    //여행 후기 상세 조회



    //여행 후기 작성



    //여행 후기 조회



    //여행 후기 삭제


}
