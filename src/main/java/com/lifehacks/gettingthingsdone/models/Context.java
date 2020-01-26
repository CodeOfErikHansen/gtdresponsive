package com.lifehacks.gettingthingsdone.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity @Getter @Setter
public class Context {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contextId;

    @Column
    private String contextName;

}
