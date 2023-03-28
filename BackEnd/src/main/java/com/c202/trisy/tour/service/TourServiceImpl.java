package com.c202.trisy.tour.service;

import com.c202.trisy.entity.Member;
import com.c202.trisy.entity.TourSchedule;
import com.c202.trisy.entity.TourScheduleDetails;
import com.c202.trisy.repository.MemberRepository;
import com.c202.trisy.tour.dto.TourDetailsResponse;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.dto.TourResponse;
import com.c202.trisy.tour.repository.TourDetailsRepository;
import com.c202.trisy.tour.repository.TourRepository;
import com.c202.trisy.tour.repository.TourSpotRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
        List<TourSchedule> tourScheduleList = tourRepository.findAllByMember_Id(memberId);

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
    public List<TourDetailsResponse> getTourDetails(Long tourId) {

        List<TourScheduleDetails> scheduleDetailList = tourRepository.findById(tourId).get().getTourScheduleList();
        List<TourDetailsResponse> detailsResponseList = new ArrayList<>();

        for(TourScheduleDetails scheduleDetails : scheduleDetailList){
            TourDetailsResponse tourDetailsResponse = TourDetailsResponse.builder()
                    .spotName(scheduleDetails.getTourSpot().getSpotName())
                    .imageUrl(scheduleDetails.getTourSpot().getImageUrl())
                    .lat(scheduleDetails.getTourSpot().getLat())
                    .lng(scheduleDetails.getTourSpot().getLng())
                    .description(scheduleDetails.getTourSpot().getSpotInfo())
                    .planDateTime(scheduleDetails.getPlanDateTime())
                    .build();

            detailsResponseList.add(tourDetailsResponse);

        }

        return detailsResponseList;
    }

    /**
     * Tour 생성
     * @param tourRequest
     * @param memberId
     */

    @Override
    public void addTourSchedule(TourRequest tourRequest,String memberId) {

        Member member = memberRepository.findByEmail(memberId).get();

        List<TourScheduleDetails> tourScheduleDetailsList = new ArrayList<>();

        for(TourRequest.SpotInfo spotInfo : tourRequest.getSpotInfoList()){
            tourScheduleDetailsList.add(
                    TourScheduleDetails.builder()
                            .tourSpot(tourSpotRepository.findById(spotInfo.getSpotId()).get())
                            .planDateTime(spotInfo.getPlanDateTime())
                            .build()
            );
        }

        TourSchedule tourSchedule = TourSchedule.builder()
                .tourName(tourRequest.getTourName())
                .startDate(tourRequest.getStartDate())
                .endDate(tourRequest.getEndDate())
                .member(member)
                .tourScheduleList(tourScheduleDetailsList)
                .build();

        tourRepository.save(tourSchedule);

    }

    /**
     * TourSchedule 업데이트
     * @param tourRequest
     * @param tourId
     */
    @Override
    public void updateTourSchedule(TourRequest tourRequest, Long tourId) {
        TourSchedule tourSchedule = tourRepository.findById(tourId).get();
        List<TourScheduleDetails> tourScheduleDetailsList = new ArrayList<>();

        for(TourRequest.SpotInfo spotInfo : tourRequest.getSpotInfoList()){
            tourScheduleDetailsList.add(
                    TourScheduleDetails.builder()
                            .tourSpot(tourSpotRepository.findById(spotInfo.getSpotId()).get())
                            .planDateTime(spotInfo.getPlanDateTime())
                            .build()
            );
        }

        tourSchedule.updateTourSchedule(tourScheduleDetailsList);

        tourRepository.save(tourSchedule);
    }

    /**
     * Tour 삭제
     * @param tourId
     */
    @Override
    public void deleteTourSchedule(Long tourId) {
        tourRepository.deleteById(tourId);
    }
}
