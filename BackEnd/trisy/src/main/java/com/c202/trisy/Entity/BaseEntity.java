package com.c202.trisy.Entity;

import lombok.Getter;

import javax.persistence.*;

@Getter
@MappedSuperclass
public class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(length = 20)
    Long id;


}
