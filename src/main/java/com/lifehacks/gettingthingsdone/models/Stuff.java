package com.lifehacks.gettingthingsdone.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter @Entity
public class Stuff {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long inboxId;

    @Column
    private String note;

    @ManyToOne
    @JoinColumn(name="status_id", nullable = false)
    private Status status;
}
