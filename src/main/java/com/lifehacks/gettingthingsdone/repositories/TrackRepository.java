package com.lifehacks.gettingthingsdone.repositories;

import com.lifehacks.gettingthingsdone.models.Track;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrackRepository extends CrudRepository<Track, Long> {
}
