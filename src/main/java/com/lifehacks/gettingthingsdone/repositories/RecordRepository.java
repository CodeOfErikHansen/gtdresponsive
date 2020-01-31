package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.Record;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecordRepository extends CrudRepository<Record, Long> {
}
