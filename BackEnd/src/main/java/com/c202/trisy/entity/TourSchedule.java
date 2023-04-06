package com.c202.trisy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
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

    private String location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    @OneToMany(mappedBy = "tourSchedule", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<TourScheduleDetails> tourScheduleList = new ArrayList<>();


    public void updateTourName(String tourName){
        this.tourName = tourName;
    }
}
