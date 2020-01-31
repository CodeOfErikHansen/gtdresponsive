package com.lifehacks.gettingthingsdone.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity @Getter @Setter
public class Record {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String recordName;

    @Column String recordBody;

    @ManyToOne
    @JoinColumn(name="status_id", nullable = false)
    private Status status;
}
