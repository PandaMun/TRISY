package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.TourSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourRepository extends JpaRepository<TourSchedule, Long> {


}
