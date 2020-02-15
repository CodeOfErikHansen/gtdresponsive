package com.lifehacks.gettingthingsdone;

import com.lifehacks.gettingthingsdone.models.*;
import com.lifehacks.gettingthingsdone.repositories.*;
import com.lifehacks.gettingthingsdone.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    @Autowired
    RecordRepository recordRepo;
    @Autowired
    TrackRepository trackRepo;
    @Autowired
    ProjectService projectService;

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

    @PostMapping(path ="/O/{inboxId}")
    public Stuff completeNote(@PathVariable Long inboxId) {
        Optional<Stuff> item = stuffRepo.findById(inboxId);
        item.get().setStatus(statusRepo.findByName("Complete"));
        return stuffRepo.save(item.get());
    }

    @GetMapping("/complete/stuff")
    public Iterable<Stuff> getCompleteStuff() {
        return stuffRepo.findAllByStatusOrStatus(statusRepo.findByName("Trashed"), statusRepo.findByName("Complete"));}
    @GetMapping("/complete/record")
    public Iterable<Record> getTrashedRecords() {return recordRepo.findAllByStatus(statusRepo.findByName("Trashed"));}
    @GetMapping("/complete/projects")
    public Iterable<GtdProject> getProjectCompletion(){
        return projectRepo.findAll();
    }

    @PostMapping(path ="/X/{inboxId}")
    public Stuff deleteNote(@PathVariable Long inboxId) {
        Optional<Stuff> item = stuffRepo.findById(inboxId);
        item.get().setStatus(statusRepo.findByName("Trashed"));
        return stuffRepo.save(item.get());
    }

    @PostMapping(path = "/projects", consumes="application/json", produces = "application/json")
    public GtdProject createProject(@RequestBody GtdProject project) {
        return projectRepo.save(project);
    }

    @PostMapping(path = "/records", consumes="application/json", produces = "application/json")
    public Record createRecord(@RequestBody Record record) {
        return recordRepo.save(record);
    }

    @GetMapping(path="/status")
    public Iterable<Status> getStatuses(){
        return statusRepo.findAll();
    }

    @GetMapping(path="/contexts")
    public Iterable<Context> getContexts(){
        return contextRepo.findAll();
    }
    @PostMapping(path="/context")
    public Context createContext(@RequestBody Context context) {
        return contextRepo.save(context);
    }
    @GetMapping(path="/projects")
    public Iterable<GtdProject> getProjects(){
        return projectService.getProjectsAndPendingActions(projectRepo.findAll());
    }
    @GetMapping(path="/records")
    public Iterable<Record> getRecords(){
        return recordRepo.findAllByStatus(statusRepo.findByName("Archive"));
    }
    @PutMapping(path = "/records", consumes="application/json", produces = "application/json")
    public Record updateRecord(@RequestBody Record record) {
        return recordRepo.save(record);
    }
    @PutMapping(path = "/deleterecord", consumes="application/json", produces = "application/json")
    public Record deleteRecord(@RequestBody Record record) {
        record.setStatus(statusRepo.findByName("Trashed"));
        return recordRepo.save(record);
    }
    @PutMapping(path="/projects", consumes="application/json", produces="application/json")
    public GtdProject updateProject(@RequestBody GtdProject project){
        return projectRepo.save(project);
    }
    @PatchMapping(path="hotseat/O", consumes = "application/json", produces = "application/json")
    public GtdProject completeAction(@RequestBody GtdProject project){
       return projectRepo.save(projectService.returnProjectWithAllCompleteActions(project));
    }
    @PatchMapping(path="hotseat/X", consumes = "application/json", produces = "application/json")
    public GtdProject trashAction(@RequestBody GtdProject project){

        return projectRepo.save(projectService.returnProjectWithAllCompleteActions(project));
    }
    @GetMapping(path="/hotseat")
    public Iterable<GtdProject> getActiveProjects(){
        return projectService.getProjectsAndPendingActions(projectRepo.findAllByStatus(statusRepo.findByName("On Deck")));

    }
}
