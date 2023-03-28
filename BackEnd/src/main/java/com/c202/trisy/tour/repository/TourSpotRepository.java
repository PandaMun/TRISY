package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.TourSchedule;
import com.c202.trisy.entity.TourSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourSpotRepository extends JpaRepository<TourSpot, Long> {

}
