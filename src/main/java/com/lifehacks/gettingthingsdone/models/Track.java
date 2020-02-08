package com.lifehacks.gettingthingsdone.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity @Getter @Setter
public class Track {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long trackId;

    @Column
    private String trackName;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Action> trackActions;

}
