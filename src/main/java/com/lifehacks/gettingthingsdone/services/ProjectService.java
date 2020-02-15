package com.lifehacks.gettingthingsdone.services;

import com.lifehacks.gettingthingsdone.models.Action;
import com.lifehacks.gettingthingsdone.models.GtdProject;
import com.lifehacks.gettingthingsdone.models.Track;
import com.lifehacks.gettingthingsdone.repositories.ActionRepository;
import com.lifehacks.gettingthingsdone.repositories.TrackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectService {
    @Autowired
    TrackRepository trackRepository;

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
    public GtdProject returnProjectWithAllCompleteActions(GtdProject project){
        List<Action> completeActions;
        List<Action> currentActions;
        List<Action> finalActions;
        for (Track track: project.getProjectTracks()
             ) {
            finalActions = new ArrayList<>();
            completeActions = findCompleteItems(trackRepository.findById(track.getTrackId()).get().getTrackActions());
            currentActions = track.getTrackActions();
            finalActions.addAll(completeActions);
            finalActions.addAll(currentActions);
            track.setTrackActions(finalActions);
        }

        return project;
    }
    public List<Action> findCompleteItems(List<Action> actions){
        List<Action> actionList = new ArrayList<>();
        for (Action action: actions
             ) {
            if(action.getSortOrder() == 0){
                actionList.add(action);
            }
        }
        return actionList;
    }
}
