package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.Action;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActionRepository extends CrudRepository<Action, Long> {
}
