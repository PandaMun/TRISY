package com.c202.trisy.tour.service;

import com.c202.trisy.tour.dto.TourDetailsCoordinateResponse;
import com.c202.trisy.tour.dto.TourDetailsResponse;
import com.c202.trisy.tour.dto.TourRequest;
import com.c202.trisy.tour.dto.TourResponse;

import javax.naming.AuthenticationException;
import java.util.List;

public interface TourService {

    List<TourResponse> getTourSchedule(String memberId);

    TourDetailsResponse getTourDetails(Long tourId);

    void addTourSchedule(TourRequest tourRequest,String memberId);

    void updateTourName(String tourName,String memberEmail, Long tourId) throws AuthenticationException;

    void deleteTourSchedule(Long tourId, String memberEmail) throws AuthenticationException;

    String existSurvey(String memberEmail);

    void addSurvey(String memberEmail, String survey);

//    List<String> getSubCategories(String middleCategoryName);
//
//    List<TourDetailsCoordinateResponse> getSpotList(String subCategoryName, String siName);


}
