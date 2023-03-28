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
public class Board extends BaseTimeEntity{

    private String title;

    @Column(columnDefinition="TEXT")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tour_schedule_id")
    private TourSchedule tourSchedule;


    private String thumbnailUrl;

    public void updateBoard(String title, String content, String thumbnailUrl){
        this.title = title;
        this.content = content;
        this.thumbnailUrl = thumbnailUrl;
    }

}
