package com.c202.trisy.tour.service;

import com.c202.trisy.tour.dto.TourDetailsResponse;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.dto.TourResponse;

import java.util.List;

public interface TourService {

    List<TourResponse> getTourSchedule(String memberId);

    List<TourDetailsResponse> getTourDetails(Long tourId);

    void addTourSchedule(TourRequest tourRequest,String memberId);

    void updateTourSchedule(TourRequest tourRequest, Long tourId);

    void deleteTourSchedule(Long tourId);
}
