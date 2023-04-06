package com.c202.trisy.tour.repository;

import com.c202.trisy.entity.Theme;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ThemeRepository extends JpaRepository<Theme,Long> {


//    @Query("select t from Theme t where t.middleCategoryName like %:middleCategoryName%")
//    List<Theme> findTheme(@Param("mainCategoryName")String mainCategoryName);


    Theme findBySubCategoryName(String subCategoryName);
}
