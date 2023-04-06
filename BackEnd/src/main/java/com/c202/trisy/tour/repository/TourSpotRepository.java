package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.Region;
import com.c202.trisy.entity.Theme;
import com.c202.trisy.entity.TourSchedule;
import com.c202.trisy.entity.TourSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TourSpotRepository extends JpaRepository<TourSpot, Long> {

    List<TourSpot> findAllByTheme_IdAndRegion_Id(Long themeId, Long regionId);

}
