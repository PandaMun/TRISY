package com.c202.trisy.repository;

import com.c202.trisy.entity.Spot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SpotRepository extends JpaRepository<Spot, Integer> {
    Optional<Spot> findByContentId(int contentId);
}
