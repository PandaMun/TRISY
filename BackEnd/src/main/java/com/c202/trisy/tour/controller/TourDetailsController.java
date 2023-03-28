package com.c202.trisy.tour.controller;


import com.c202.trisy.tour.service.TourDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trisy/api/tourdetails")
public class TourDetailsController {

    private final TourDetailsService tourDetailsService;


    //여행 세부일정 상세정보 조회



    //내 여행 위치 정보 전체 조회



    //

}
