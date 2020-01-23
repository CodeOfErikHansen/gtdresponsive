package com.lifehacks.gettingthingsdone.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

@Getter @Setter @Entity
public class Status {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long statusId;

    @Column
    private String name;

    @Column
    private String description;

}
