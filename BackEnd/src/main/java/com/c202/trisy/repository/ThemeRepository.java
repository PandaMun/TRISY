package com.c202.trisy.repository;

import com.c202.trisy.entity.Theme;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ThemeRepository extends JpaRepository<Theme, Long> {
    Optional<Theme> findBySubCategory(String subCategory);
}
