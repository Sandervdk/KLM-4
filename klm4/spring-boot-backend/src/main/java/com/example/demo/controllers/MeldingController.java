package com.example.demo.controllers;

import com.example.demo.exceptions.MeldingNotFoundException;
import com.example.demo.models.Melding;
import com.example.demo.repositories.MeldingRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@Transactional
public class MeldingController {

  @Autowired
  private MeldingRepositorie meldingRepositorie;

  //GET all requests
  @GetMapping("/openstaande-meldingen")
  public List<Melding> getAllMeldingen(){
    return meldingRepositorie.findAll();
  }

  //FIND
  @GetMapping("/openstaande-meldingen/{id}")
  public Melding getRequest(@PathVariable long id) {
    Melding meldingByID = meldingRepositorie.findMelding(id);
    if (meldingByID == null) {
      throw new MeldingNotFoundException("Melding met id: " + id + " is niet gevonden.");
    }
    return meldingByID;
  }

  //CREATED a new event
  @PostMapping("/openstaande-meldingen")
  public ResponseEntity<Object> addNewMelding(@RequestBody Melding newMelding) {
    Melding saveMelding = this.meldingRepositorie.save(newMelding);
    // This will take the current uri ("/events") and append ("/id") from the new saved event
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(saveMelding.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

//  //TODO fix this method
//  //UPDATE a melding by id
//  @PutMapping("/openstaande-meldingen/{id}")
//  public Melding updateMeldingById(@PathVariable long id, @RequestBody Melding updateMelding) {
//    Melding meldingID = this.meldingRepositorie.findMeldingByID(id);
//
//
//  }

  //DELETE a event
  @DeleteMapping("/openstaande-meldingen/{id}")
  public void deleteEventById(@PathVariable long id) {
    Melding event = meldingRepositorie.deleteMelding(id);
    if (event == null) {
      throw new MeldingNotFoundException("Melding met id: " + id + " kan niet worden verwijderd, omdat deze niet is gevonden");
    }
  }

}
