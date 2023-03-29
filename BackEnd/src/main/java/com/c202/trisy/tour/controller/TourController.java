package com.c202.trisy.tour.controller;


import com.c202.trisy.tour.dto.RecommendRequest;
import com.c202.trisy.tour.dto.TourDetailsResponse;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.dto.TourResponse;
import com.c202.trisy.tour.service.TourService;
import com.c202.trisy.user.auth.PrincipalDetails;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trisy/api/tour")
public class TourController {

    private final TourService tourService;

    //여행지 검색(카테고리{대분류, 중분류, 소분류}, 이름)
    @GetMapping("/{mainCategory}/{middleCategory}/{subCategory}")
    public ResponseEntity<?> searchSpot(@RequestParam("spotName") String spotName,
                                        @RequestParam("location") String Location,
                                        @PathVariable("mainCategory") String mainCategory,
                                        @PathVariable("middleCategory") String middleCategory,
                                        @PathVariable("subCategory") String subCategory){




        return null;
    }


    //추천 여행지 조회(지역, 날짜, 카테고리)
    @GetMapping("/recommend")
    public ResponseEntity<?> searchRecommendSpot(@RequestBody RecommendRequest recommendRequest){

        return null;
    }

    //여행 일정 전체 조회(회원 아이디)
    @GetMapping
    public ResponseEntity<?> searchTourSchedules(Authentication authentication) {

        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

            List<TourResponse> tourResponseList = tourService.getTourSchedule(principal.getMember().getEmail());

            return ResponseEntity.ok(tourResponseList);
        }catch (AuthenticationException e){

        }catch (NoSuchElementException e){

        }
        return null;
    }

    //여행 세부일정 상세정보 조회(여행 아이디)
    @GetMapping("/{tourId}")
    public ResponseEntity<?> searchTourScheduleDetails(@PathVariable("tourId") Long tourId, Authentication authentication){

        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

            TourDetailsResponse tourDetails = tourService.getTourDetails(tourId);
            return ResponseEntity.ok(tourDetails);

        }catch (NullPointerException e){
            return new ResponseEntity("회원을 찾을수 없습니다.", HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity("응답에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }



    }

    //여행 일정 생성(아이디, 선택한 관광정보 리스트, 날짜 + 시간)
    @PostMapping
    public ResponseEntity<?> createTourSchedule(@RequestBody TourRequest tourRequest,Authentication authentication) {

        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String memberEmail = principal.getMember().getEmail();
            tourService.addTourSchedule(tourRequest, memberEmail);
            return ResponseEntity.ok("Success");
        }catch (NullPointerException e){
            return new ResponseEntity("회원을 찾을수 없습니다.", HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity("응답에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //여행 일정 수정(아이디, 선택한 관광정보 리스트, 날짜 + 시간)
    @PutMapping ("/{tourId}")
    public ResponseEntity<?> modifyTourSchedule(@RequestBody TourRequest tourRequest
                                                    ,@PathVariable("tourId") Long tourId
                                                        ,Authentication authentication){

        try{
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String memberEmail = principal.getMember().getEmail();
            tourService.updateTourSchedule(tourRequest,memberEmail, tourId);
            return ResponseEntity.ok("Success");

        }catch (AuthenticationException e){
            return new ResponseEntity("접근 권한이 없습니다.", HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity("응답에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //여행 일정 삭제(여행 아이디, 회원 아이디 비교 or 권한(authentication))
    @DeleteMapping("/{tourId}")
    public ResponseEntity<?> deleteTourSchedule(@PathVariable("tourId") Long tourId, Authentication authentication){

        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String memberEmail = principal.getMember().getEmail();
            tourService.deleteTourSchedule(tourId,memberEmail);
        }catch (AuthenticationException e){
            return new ResponseEntity("접근 권한이 없습니다.", HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity("응답에 실패하였습니다.", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("success");
    }



}
