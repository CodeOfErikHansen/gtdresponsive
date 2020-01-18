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

    //todo: bring in status object so that it can be used to filter across sections. What is best annotation and do I need a repo
}
