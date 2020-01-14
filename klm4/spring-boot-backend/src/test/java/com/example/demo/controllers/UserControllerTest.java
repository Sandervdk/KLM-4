/**
 * BELANGRIJK: tests moeten allemaal tegelijk worden uitgevoerd, omdat de database niet na elk verzoek leeg is, dus het aantal
 * aanvragen blijven toenemen voor elke test
 *
 * @author Maninder Singh, 500804905
 */
package com.example.demo.controllers;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.enums.Functions;
import com.example.demo.exceptions.RequestNotFoundException;
import com.example.demo.exceptions.UserNotFoundException;
import com.example.demo.models.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

class UserControllerTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  UserController userController;


  private User runner;
  private User mechanic;
  private User admin;

  /**
   * met deze methode maak ik drie nieuwe users aan.
   */
  @BeforeEach
  private void createUsersTestEnvironment() {
    assertNotNull(application);
    runner = new User("runneremail", "runnerpassword", "testR", "Runner", Functions.RUNNER);
    mechanic = new User("mechanicemail", "mechanicpassword", "testM", "Mechanic", Functions.MECHANIC);
    admin = new User("adminemail", "adminpassword", "testA", "Admin", Functions.ADMIN);

  }

  /**
   * met deze methode haal ik alle users op
   */
    @Test
    @Order(1)
  void getAllUsers() {
    assertEquals(4, userController.getAllUsers().size());
  }

  /**
   * met deze methode maak ik drie nieuwe users aan
   * aantal users voor methode = 4
   * aantal users na methode = 7
   */
  @Test
  @Order(2)
  void createUser() {
    userController.createUser(admin);
    userController.createUser(runner);
    userController.createUser(mechanic);
    assertEquals(7, userController.getAllUsers().size());

  }

  /**
   * met deze methode haal ik een specifiek user op met de id
   * vervolgens haal ik email van die user op
   * daarnaast haal ik voornaam en achternaam van de user op met de id
   */
  @Test
  @Order(3)
  void getUser() {
    User user =  userController.getUser(1004);
    assertEquals(1004, user.getId());
    assertEquals("mechanicus@klm.nl", user.getEmail());
    assertEquals("Mark", user.getFirstname());
    assertEquals("Anic", user.getLastname());

  }

  /**
   *    Met deze methode check ik of de user bestaat en als de user niet bestaat
   *    dan krijg je een fout melding.
   */
  @Test
  @Order(4)
  void userNotFound() {
    UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
      userController.getUser(420);
    });

    assertEquals("User met de id: 420 is niet gevonden.", exception.getMessage());
  }

  /**
   * Met deze methode check ik of de user bestaat met een specifieke id
   * als de user bestaat met die id dan wordt het verwijderd
   * voor deze methode aantal users = 7
   * Na deze methode aantal users = 6
   * als de user niet bestaat dan krijg je een fout melding
   */
  @Test
  @Order(5)
  void deleteEventById() {
    assertEquals(7, userController.getAllUsers().size());
    userController.deleteEventById(1003);
    assertEquals(6, userController.getAllUsers().size());

    UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
      userController.getUser(422);
    });

    assertEquals("User met de id: 422 is niet gevonden.", exception.getMessage());


  }
}
