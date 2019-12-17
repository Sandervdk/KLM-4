package com.example.demo.controllers;

import com.example.demo.exceptions.RequestNotFoundException;
import com.example.demo.models.Request;
import com.example.demo.repositories.RequestRepositorie;
import com.example.demo.repositories.UserRepositorie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.transaction.Transactional;
import java.net.URI;
import java.util.List;

@RestController
@Transactional
public class RequestController {

  @Autowired
  private RequestRepositorie requestRepositorie;
  @Autowired
  private UserRepositorie userRepositorie;

  //GET all requests
  @GetMapping("/open-requests")
  public List<Request> getAllMeldingen(){
    return requestRepositorie.findAll();
  }

  //FIND a request
  @GetMapping("/open-requests/{requestId}")
  public Request getRequest(@PathVariable long requestId) {
    Request requestByID = requestRepositorie.findRequest(requestId);
    if (requestByID == null) {
      throw new RequestNotFoundException("Melding met id: " + requestId + " is niet gevonden.");
    }
    return requestByID;
  }

  //CREATED a new request with the current user
  @PostMapping("/users/{userID}/open-requests")
  public ResponseEntity<Object> addNewRequestToUser(@PathVariable long userID,@RequestBody Request newRequest) {

    //adding the request to the user
    Request saveRequest = this.requestRepositorie.addRequestsToUser(userID , newRequest);
    // This will take the current uri ("/users/{userID}/open-requests") and append ("/requestId") from the new saved event
    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{requestId}").buildAndExpand(saveRequest.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }


  //DELETE a request
  @DeleteMapping("/open-requests/{requestId}")
  public void deleteRequestById(@PathVariable long requestId) {
    Request request = requestRepositorie.deleteRequest(requestId);
    if (request == null) {
      throw new RequestNotFoundException("Melding met id: " + requestId + " kan niet worden verwijderd, omdat deze niet is gevonden");
    }
  }

}
