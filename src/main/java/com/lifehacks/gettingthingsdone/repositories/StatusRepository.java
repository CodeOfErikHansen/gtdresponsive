package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.Status;
import org.springframework.data.repository.CrudRepository;

public interface StatusRepository extends CrudRepository<Status,Long> {
    Status findByName(String name);
}
