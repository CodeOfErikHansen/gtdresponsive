package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.Context;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContextRepository extends CrudRepository<Context, Long> {
}
