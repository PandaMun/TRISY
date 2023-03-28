package com.c202.trisy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Builder
public class TourSchedule extends BaseEntity{

    private String tourName;

    private LocalDate startDate;

    private LocalDate endDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    @OneToMany(mappedBy = "tourSchedule")
    private List<TourScheduleDetails> tourScheduleList = new ArrayList<>();


    public void updateTourSchedule(List<TourScheduleDetails> tourScheduleList){
        this.tourScheduleList = tourScheduleList;
    }
}
