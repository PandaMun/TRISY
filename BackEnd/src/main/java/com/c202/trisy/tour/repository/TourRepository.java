package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.TourSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TourRepository extends JpaRepository<TourSchedule, Long> {

    List<TourSchedule> findAllByMember_Email(String memberEmail);
}
