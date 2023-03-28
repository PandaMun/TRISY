package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.TourSchedule;
import com.c202.trisy.entity.TourSpot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourSpotRepository extends JpaRepository<TourSpot, Long> {

}
