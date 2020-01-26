package com.lifehacks.gettingthingsdone.models;

import lombok.Generated;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter @Entity
public class GtdProject {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long projectId;

    @Column
    private String projectName;

    @Column
    private String projectSummary;

    @ManyToOne
    @JoinColumn(name="status_id", nullable = false)
    private Status status;

    @OneToMany
    private List<Action> projectActions;
}
