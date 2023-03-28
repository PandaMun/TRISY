package com.c202.trisy.tour.service;

import com.c202.trisy.tour.repository.TourRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TourServiceImpl implements TourService{

    private final TourRepository tourRepository;

    @Override
    public void deleteTourSchedule(Long tourId) {
        tourRepository.deleteById(tourId);
    }
}
