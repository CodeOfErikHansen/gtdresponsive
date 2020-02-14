package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.Status;
import com.lifehacks.gettingthingsdone.models.Stuff;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StuffRepository extends CrudRepository<Stuff, Long> {
    List<Stuff> findAllByStatus(Status status);
    Iterable<Stuff> findAllByStatusOrStatus(Status status1, Status status2);
}
