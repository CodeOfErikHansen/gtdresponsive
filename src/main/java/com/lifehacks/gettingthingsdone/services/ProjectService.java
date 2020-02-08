package com.lifehacks.gettingthingsdone.services;

import com.lifehacks.gettingthingsdone.models.Action;
import com.lifehacks.gettingthingsdone.models.GtdProject;
import com.lifehacks.gettingthingsdone.models.Track;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ProjectService {
    public ArrayList<GtdProject> getProjectsAndPendingActions(Iterable<GtdProject> projects){
        ArrayList<GtdProject> projectList = new ArrayList<>();
        ArrayList<Track> trackList;
        ArrayList<Action> actionList;
        for(GtdProject project: projects){
            trackList = new ArrayList<>();
            for(Track track: project.getProjectTracks()){
                actionList = new ArrayList<>();
                for(Action action: track.getTrackActions()){
                    if(action.getSortOrder() > 0){
                        actionList.add(action);
                    }
                }
                track.setTrackActions(actionList);
                trackList.add(track);
            }
            project.setProjectTracks(trackList);
            projectList.add(project);
        }
        return projectList;
    }
}
