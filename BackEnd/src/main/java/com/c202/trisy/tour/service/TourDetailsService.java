package com.c202.trisy.tour.service;

public interface TourDetailsService {

    public void createTourDetails();
    public void updateTourDetails();
    public void deleteTourDetails(Long tourDetailsId);

    public void selectTourDetails(Long tourId);

}
