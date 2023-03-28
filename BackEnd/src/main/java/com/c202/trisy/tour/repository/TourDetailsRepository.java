package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.TourScheduleDetails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TourDetailsRepository extends JpaRepository<TourScheduleDetails, Long> {

//    List<TourScheduleDetails> findAllByT


}
