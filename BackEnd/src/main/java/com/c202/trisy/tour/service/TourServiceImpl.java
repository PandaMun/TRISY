package com.c202.trisy.tour.service;

import com.c202.trisy.entity.Member;
import com.c202.trisy.entity.Survey;
import com.c202.trisy.entity.TourSchedule;
import com.c202.trisy.entity.TourScheduleDetails;
import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.tour.dto.TourDetailsResponse;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.dto.TourResponse;
import com.c202.trisy.tour.repository.TourRepository;
import com.c202.trisy.tour.repository.TourSpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.naming.AuthenticationException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService{

    private final TourRepository tourRepository;
    private final MemberRepository memberRepository;
    private final TourSpotRepository tourSpotRepository;

    /**
     * Tour 전체조회
     * @param memberId
     * @return TourResponseList
     */
    @Override
    public List<TourResponse> getTourSchedule(String memberId) {

        List<TourResponse> tourResponses = new ArrayList<>();
        List<TourSchedule> tourScheduleList = tourRepository.findAllByMember_Email(memberId);

        for(TourSchedule tourSchedule : tourScheduleList){
            TourResponse tourResponse = TourResponse.builder()
                    .tourName(tourSchedule.getTourName())
                    .id(tourSchedule.getId())
                    .startDate(tourSchedule.getStartDate())
                    .endDate(tourSchedule.getEndDate())
                    .build();

            tourResponses.add(tourResponse);
        }
        return tourResponses;
    }

    /**
     * Tour 상세 리스트 조회
     * @param tourId
     * @return List<TourDetailsResponse>
     */
    @Override
    public TourDetailsResponse getTourDetails(Long tourId) {

        TourSchedule tourSchedule = tourRepository.findById(tourId).get();
        List<TourDetailsResponse.TourScheduleDetail> detailsResponseList = new ArrayList<>();

        for(TourScheduleDetails scheduleDetails : tourSchedule.getTourScheduleList()){

            TourDetailsResponse.TourScheduleDetail tourScheduleDetail = TourDetailsResponse.TourScheduleDetail.builder()
                    .spotName(scheduleDetails.getTourSpot().getSpotName())
                    .imageUrl(scheduleDetails.getTourSpot().getImageUrl())
                    .lat(scheduleDetails.getTourSpot().getLat())
                    .lng(scheduleDetails.getTourSpot().getLng())
                    .description(scheduleDetails.getTourSpot().getSpotInfo())
                    .planDate(scheduleDetails.getPlanDate())
                    .build();

            detailsResponseList.add(tourScheduleDetail);
        }

        return TourDetailsResponse.builder()
                .id(tourSchedule.getId())
                .tourName(tourSchedule.getTourName())
                .startDate(tourSchedule.getStartDate())
                .endDate(tourSchedule.getEndDate())
                .tourDetailsResponseList(detailsResponseList)
                .build();
    }

    /**
     * Tour 생성
     * @param tourRequest
     * @param memberId
     */

    @Override
    @Transactional
    public void addTourSchedule(TourRequest tourRequest,String memberId) {

        Member member = memberRepository.findByEmail(memberId).get();

        List<TourScheduleDetails> tourScheduleDetails = new ArrayList<>();
        TourSchedule tourSchedule = TourSchedule.builder()
                .tourName(tourRequest.getTourName())
                .startDate(tourRequest.getStartDate())
                .endDate(tourRequest.getEndDate())
                .tourScheduleList(tourScheduleDetails)
                .member(member)
                .build();

        for(TourRequest.SpotInfo spotInfo : tourRequest.getSpotInfoList()) {
            TourScheduleDetails details = TourScheduleDetails.builder()
                    .tourSpot(tourSpotRepository.findById(spotInfo.getSpotId()).get())
                    .planDate(spotInfo.getPlanDate())
                    .tourSchedule(tourSchedule)

                    .build();
            tourScheduleDetails.add(details);
        }

       tourRepository.save(tourSchedule);
    }



    /**
     * TourSchedule 업데이트
     * @param tourRequest
     * @param tourId
     */
    @Override
    public void updateTourSchedule(TourRequest tourRequest, String memberEmail, Long tourId) throws AuthenticationException {
        TourSchedule tourSchedule = tourRepository.findById(tourId).get();
        if(!tourSchedule.getMember().getEmail().equals(memberEmail)){
            throw new AuthenticationException("권한이 없습니다.");
        }
        List<TourScheduleDetails> tourScheduleDetailsList = new ArrayList<>();
        for(TourRequest.SpotInfo spotInfo : tourRequest.getSpotInfoList()){
            TourScheduleDetails tourScheduleDetail = TourScheduleDetails.builder()
                    .tourSpot(tourSpotRepository.findById(spotInfo.getSpotId()).get())
                    .planDate(spotInfo.getPlanDate())
                    .build();

            tourScheduleDetailsList.add(tourScheduleDetail);
        }

        tourSchedule.updateTourSchedule(tourScheduleDetailsList);

        tourRepository.save(tourSchedule);
    }

    /**
     * Tour 삭제
     * @param tourId
     */
    @Override
    public void deleteTourSchedule(Long tourId, String memberEmail) throws AuthenticationException {
        TourSchedule tourSchedule = tourRepository.findById(tourId).get();
        if(!tourSchedule.getMember().getEmail().equals(memberEmail)){
            throw new AuthenticationException("권한이 없습니다.");
        }
        tourRepository.deleteById(tourId);
    }


    @Override
    public String existSurvey(String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).get();
        String survey = member.getSurvey().getSurvey();
        return survey;
    }

    /**
     * 설문 조사 등록
     * @param memberEmail
     * @return
     */
    @Override
    public void addSurvey(String memberEmail, String surveyResult) {
        Member member = memberRepository.findByEmail(memberEmail).get();

        Survey survey = Survey.builder()
                .survey(surveyResult)
                .build();
        member.updateSurvey(survey);

        memberRepository.save(member);
    }
}
