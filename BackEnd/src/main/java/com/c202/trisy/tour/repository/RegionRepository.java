package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RegionRepository extends JpaRepository<Region,Long> {

    List<Region> findAllBySiName(String name);
}
