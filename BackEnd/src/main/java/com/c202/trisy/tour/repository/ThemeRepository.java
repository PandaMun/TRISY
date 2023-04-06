package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.Theme;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThemeRepository extends JpaRepository<Theme,Long> {


    List<Theme> findAllByMiddleCategoryName(String middleCategoryName);

}
