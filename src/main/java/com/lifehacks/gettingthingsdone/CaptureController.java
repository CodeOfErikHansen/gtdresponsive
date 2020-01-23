package com.lifehacks.gettingthingsdone;

import com.lifehacks.gettingthingsdone.models.Stuff;
import com.lifehacks.gettingthingsdone.repositories.StatusRepository;
import com.lifehacks.gettingthingsdone.repositories.StuffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController  @CrossOrigin
public class CaptureController {

    @Autowired
    StuffRepository stuffRepo;
    @Autowired
    StatusRepository statusRepo;


    @GetMapping("/inbox")
    public Iterable<Stuff> getInbox() {
        return stuffRepo.findAllByStatus(statusRepo.findByName("Inbox"));
    }

    @PostMapping(path ="/inbox", consumes = "application/json", produces = "application/json")
    public Stuff saveNote(@RequestBody Stuff stuff) {
        stuff.setStatus(statusRepo.findByName("Inbox"));
        return stuffRepo.save(stuff);
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

}
