package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.GtdProject;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GtdProjectRepository extends CrudRepository<GtdProject, Long> {
}
