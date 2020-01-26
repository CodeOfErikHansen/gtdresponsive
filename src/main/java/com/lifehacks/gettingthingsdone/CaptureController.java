package com.lifehacks.gettingthingsdone;

import com.lifehacks.gettingthingsdone.models.Context;
import com.lifehacks.gettingthingsdone.models.GtdProject;
import com.lifehacks.gettingthingsdone.models.Status;
import com.lifehacks.gettingthingsdone.models.Stuff;
import com.lifehacks.gettingthingsdone.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController  @CrossOrigin
public class CaptureController {

    @Autowired
    StuffRepository stuffRepo;
    @Autowired
    StatusRepository statusRepo;
    @Autowired
    GtdProjectRepository projectRepo;
    @Autowired
    ContextRepository contextRepo;
    @Autowired
    ActionRepository actionRepo;

    @GetMapping("/inbox")
    public Iterable<Stuff> getInbox() {
        return stuffRepo.findAllByStatus(statusRepo.findByName("Inbox"));
    }

    @PostMapping(path ="/inbox", consumes = "application/json", produces = "application/json")
    public Stuff saveNote(@RequestBody Stuff stuff) {
        stuff.setStatus(statusRepo.findByName("Inbox"));
        return stuffRepo.save(stuff);
    }
    @DeleteMapping(path="/inbox/{id}")
    public void deleteStuff(@PathVariable Long id){
        stuffRepo.delete(stuffRepo.findById(id).get());
    }
    @GetMapping("/O")
    public Iterable<Stuff> getComplete() {return stuffRepo.findAllByStatus(statusRepo.findByName("Complete"));}

    @PostMapping(path ="/O/{inboxId}")
    public Stuff completeNote(@PathVariable Long inboxId) {
        Optional<Stuff> item = stuffRepo.findById(inboxId);
        item.get().setStatus(statusRepo.findByName("Complete"));
        return stuffRepo.save(item.get());
    }

    @GetMapping("/X")
    public Iterable<Stuff> getTrashed() {return stuffRepo.findAllByStatus(statusRepo.findByName("Trashed"));}

    @PostMapping(path ="/X/{inboxId}")
    public Stuff deleteNote(@PathVariable Long inboxId) {
        Optional<Stuff> item = stuffRepo.findById(inboxId);
        item.get().setStatus(statusRepo.findByName("Trashed"));
        return stuffRepo.save(item.get());
    }

    @PostMapping(path = "/projects", consumes="application/json", produces = "application/json")
    public GtdProject createProject(@RequestBody GtdProject project) {
        actionRepo.saveAll(project.getProjectActions());

        return projectRepo.save(project);
    }

    @GetMapping(path="/status")
    public Iterable<Status> getStatuses(){
        return statusRepo.findAll();
    }

    @GetMapping(path="/contexts")
    public Iterable<Context> getContexts(){
        return contextRepo.findAll();
    }
    @GetMapping(path="projects")
    public Iterable<GtdProject> getProjects(){
        return projectRepo.findAll();
    }
}
