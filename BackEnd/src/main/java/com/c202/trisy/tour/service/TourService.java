package com.c202.trisy.tour.service;

import com.c202.trisy.tour.dto.TourDetailsResponse;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.dto.TourResponse;

import javax.naming.AuthenticationException;
import java.util.List;

public interface TourService {

    List<TourResponse> getTourSchedule(String memberId);

    TourDetailsResponse getTourDetails(Long tourId);

    void addTourSchedule(TourRequest tourRequest,String memberId);

    void updateTourSchedule(TourRequest tourRequest,String memberEmail, Long tourId) throws AuthenticationException;

    void deleteTourSchedule(Long tourId, String memberEmail) throws AuthenticationException;
}