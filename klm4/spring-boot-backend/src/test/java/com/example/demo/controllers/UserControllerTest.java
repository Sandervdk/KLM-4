package com.example.demo.controllers;

/**
 * @author: Sagi Lalee, 500695726
 */

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.enums.Functions;
import com.example.demo.exceptions.RequestNotFoundException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.models.User;
import com.example.demo.repositories.UserRepositorie;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension.class)
class UserControllerTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  UserController userController;

  @Autowired
  UserRepositorie userRepositorie;

  @Autowired
  TestRestTemplate testRestTemplate;

  @Test
  void postRequest() {
    //create new user to post
    User runner = new User("runner@klm.nl", "password", "test", "lastname", Functions.RUNNER);

    //make the post request
    ResponseEntity<User> responseEntity = this.testRestTemplate.postForEntity("/users", runner, User.class);

    //check if the response status is created
    assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
  }

  @Test
  void checkPassword() {
    //retrieve a user that is inserted with the data.sql file
    User user = userRepositorie.findUser(1001);
    ResponseEntity<User> responseEntity = this.testRestTemplate.getForEntity("/users/" + user.getId(), User.class);

    //check status code and if its not null
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    User retrievedUser = responseEntity.getBody();
    assertThat(retrievedUser, is(notNullValue()));

    // if the user is not null check the password
    assertEquals(user.getPassword(), retrievedUser.getPassword());
  }

  @Test
  void getAllUsers() {
    assertEquals(4, userController.getAllUsers().size());
  }

  /**
   * Check if the user from the database is the same user that you retieve from the endpoint.
   */
  @Test
  void getUser() {
    //retieve the user from the database and trough the endpoint
    User user = userRepositorie.findUser(1002);
    ResponseEntity<User> responseEntity = this.testRestTemplate.getForEntity("/users/" + user.getId(), User.class);

    //check the statuscode, response is not null and from the same object class
    assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    User retrievedUser = responseEntity.getBody();
    assertThat(retrievedUser, is(instanceOf(User.class)));
    assertThat(retrievedUser, is(notNullValue()));

    //compare the user from the database with the user from the endpoint
    assertEquals(user.getId(), retrievedUser.getId());
    assertEquals(user.getEmail(), retrievedUser.getEmail());
    assertEquals(user.getFirstname(), retrievedUser.getFirstname());
    assertEquals(user.getLastname(), retrievedUser.getLastname());
  }

  /**
   * Throw an User not found exception if user does not excist.
   */
  @Test
  void userNotFound() {
    UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
      userController.getUser(420);
    });

    assertEquals("User met de id: 420 is niet gevonden.", exception.getMessage());
  }


  @Test
  void deleteEventById() {
    assertEquals(4, userController.getAllUsers().size());
    userController.deleteUserById(1002);
    assertEquals(3, userController.getAllUsers().size());

    UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
      userController.getUser(422);
    });

    assertEquals("User met de id: 422 is niet gevonden.", exception.getMessage());
  }
}
