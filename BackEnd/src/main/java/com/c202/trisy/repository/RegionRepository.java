package com.c202.trisy.repository;

import com.c202.trisy.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RegionRepository extends JpaRepository<Region, Long> {
    Optional<Region> findByGuGunCodeAndSiCode(int guGunCode, int siCode);
}
