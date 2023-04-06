package com.c202.trisy.tour.controller;


import com.c202.trisy.tour.dto.*;
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
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/trisy/api/tour")
public class TourController {

    private final TourService tourService;

    //여행지 검색(카테고리{중분류})
    @GetMapping("/middlecategory")
    public ResponseEntity<?> searchSubCategoryName(@RequestBody Map<String,String> map){

        List<String> subCategories = tourService.getSubCategories(map.get("middleCategory"));
        return ResponseEntity.ok(subCategories);
    }



    @GetMapping("/subcategory")
    public ResponseEntity<?> searchSubCategoryCode(@RequestBody TourDetailRequest tourDetailRequest){
        List<TourDetailsCoordinateResponse> spotList = tourService.getSpotList(tourDetailRequest.getSubCategoryName(), tourDetailRequest.getSiName());
        return ResponseEntity.ok(spotList);
    }

    //회원 설문조사 존재 확인 
    @GetMapping("/survey")
    public ResponseEntity<?> existSurvey(Authentication authentication){
        PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
        String memberEmail = principal.getMember().getEmail();
        String survey = tourService.existSurvey(memberEmail);
        return ResponseEntity.ok(survey);


    }

    //회원 설문조사 등록
    @PostMapping("/survey")
    public ResponseEntity<?> addSurvey(Authentication authentication, @RequestBody Map<String,String> map){
        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String memberEmail = principal.getMember().getEmail();

            tourService.addSurvey(memberEmail, map.get("survey"));
            return ResponseEntity.ok("설문이 성공적으로 저장되었습니다.");
        }catch (Exception e){
            return new ResponseEntity("설문 저장에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    //여행 일정 전체 조회(회원 아이디)
    @GetMapping
    public ResponseEntity<?> searchTourSchedules(Authentication authentication) {

        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

            List<TourResponse> tourResponseList = tourService.getTourSchedule(principal.getMember().getEmail());

            return ResponseEntity.ok(tourResponseList);
        }catch (AuthenticationException e){
            return new ResponseEntity("인증에 실패하셨습니다.", HttpStatus.UNAUTHORIZED);
        }catch (NoSuchElementException e){
            return new ResponseEntity("일정이 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    //여행 세부일정 상세정보 조회(여행 아이디)
    @GetMapping("/{tourId}")
    public ResponseEntity<?> searchTourScheduleDetails(@PathVariable("tourId") Long tourId, Authentication authentication){

        try {
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();

            TourDetailsResponse tourDetails = tourService.getTourDetails(tourId);
            return ResponseEntity.ok(tourDetails);

        }catch (NullPointerException e){
            return new ResponseEntity("회원을 찾을수 없습니다.", HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            return new ResponseEntity("응답에 실패하였습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
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
    public ResponseEntity<?> modifyTourSchedule(@RequestBody Map<String,String> map
                                                    ,@PathVariable("tourId") Long tourId
                                                        ,Authentication authentication){

        try{
            PrincipalDetails principal = (PrincipalDetails) authentication.getPrincipal();
            String memberEmail = principal.getMember().getEmail();
            tourService.updateTourName(map.get("tourName"),memberEmail, tourId);
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
            return new ResponseEntity("접근 권한이 없습니다." + e.getMessage(), HttpStatus.BAD_REQUEST);
        }catch (Exception e){
            return new ResponseEntity("응답에 실패하였습니다." + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok("success");
    }



}
