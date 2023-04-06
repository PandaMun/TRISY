package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RegionRepository extends JpaRepository<Region,Long> {

    Region findRegionBySiName(String name);
}
