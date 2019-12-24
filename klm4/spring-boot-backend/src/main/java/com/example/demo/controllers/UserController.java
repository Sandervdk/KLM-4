package com.example.demo.controllers;

import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.models.User;
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
public class UserController {

  @Autowired
  private UserRepositorie userRepositorie;

  //GET all users
  @GetMapping("/users")
  public List<User> getAllUsers() {
    return userRepositorie.findAllUsers();
  }

  //FIND a specific user
  @GetMapping("/users/{email}")
  public User getUser(@PathVariable String email) {
    User user = userRepositorie.findUserByEmail(email);
    if (user == null) {
      throw new UserNotFoundException("User met de email: " + email + " is niet gevonden.");
    }
    return user;
  }

  //TODO add password hashing when a new user is created.
  //CREATE a new user
  @PostMapping("/users")
  public ResponseEntity<Object> createUser(@RequestBody User user) {
    User newUser = userRepositorie.save(user);

    URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("{id}").buildAndExpand(newUser.getId()).toUri();
    return ResponseEntity.created(uri).build();
  }

  //TODO add that only admins can delete users.
  //DELETE a event
  @DeleteMapping("/users/{email}")
  public void deleteUsertById(@PathVariable String email) {
    User event = userRepositorie.deleteUserByEmail(email);
    if (event == null) {
      throw new UserNotFoundException("User met email: " + email + " kan niet worden verwijderd, omdat deze niet is gevonden");
    }
  }

}
