package com.lifehacks.gettingthingsdone.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity @Getter @Setter
public class Action {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long actionId;

    @Column
    private String actionTitle;

    @Column
    private String actionDescription;

    @ManyToOne
    @JoinColumn(name="context_id", nullable=false)
    private Context context;


}
