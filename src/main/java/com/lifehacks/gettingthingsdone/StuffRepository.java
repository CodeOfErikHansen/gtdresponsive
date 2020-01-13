package com.lifehacks.gettingthingsdone;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StuffRepository extends CrudRepository<Stuff, Long> {
}
