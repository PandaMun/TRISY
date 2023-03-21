package com.c202.trisy.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Entity
@Builder
public class TourSchedule extends BaseEntity{

    private String tourName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    @OneToMany(mappedBy = "tour_schedule", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourScheduleDetails> tourScheduleList = new ArrayList<>();
}
