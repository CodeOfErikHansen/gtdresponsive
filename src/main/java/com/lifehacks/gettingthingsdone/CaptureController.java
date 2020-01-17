package com.lifehacks.gettingthingsdone;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController  @CrossOrigin
public class CaptureController {

    @Autowired
    StuffRepository stuffRepo;


    @GetMapping("/inbox")
    public Iterable<Stuff> getInbox() {
        return stuffRepo.findAll();
    }

    @PostMapping(path ="/inbox", consumes = "application/json", produces = "application/json")
    public Stuff saveNote(@RequestBody Stuff stuff) {
        return stuffRepo.save(stuff);
    }

}
