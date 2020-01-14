package com.example.demo.controllers;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.enums.Functions;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.exceptions.RequestNotFoundException;
import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * IMPORTANT: Tests should be run all together, since the database doesn't empty after every request so the number of
 * requests keeps increasing for each test
 * <p>
 * Made by Sander van de Kamp, 500734351
 */
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class RequestControllerTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  private RequestController requestController;

  @Autowired
  private UserController userController;

  private User runner;
  private User mechanic;
  private Request request1;
  private Request request2;
  private Request request3;
  private Request request4;
  private Request request5;

  /**
   * The test starts off with 6 standard requests from the data.sql file, if those are changed this test will also change
   */
  @BeforeEach
  private void createRequests() {
    assertNotNull(application);
    runner = new User("Bestest Runner", "bigboi password", "bestest", "Runner", Functions.RUNNER);
    mechanic = new User("Gooder Mechanic", "Fancy password", "Gooder", "Mechanic", Functions.MECHANIC);

    request1 = new Request("C2", LocalDateTime.now(), PlaneTypes.AIRBUSA330200, "PH_AKB", "Nitrogen Cart", 0, "Left", "Pending", null);
    request2 = new Request("B5", LocalDateTime.now(), PlaneTypes.AIRBUSA330300, "PH_AKB", "Tires Cart", 0, "Right", "Pending", null);
    request3 = new Request("F2", LocalDateTime.now(), PlaneTypes.BOEING747400, "PH_AKB", "Skydrol Cart", 0, "Nose", "Delivered", null);
    request4 = new Request("G7", LocalDateTime.now(), PlaneTypes.BOEING737800, "PH_AKB", "Nitrogen Cart", 0, "Right", "Pending", null);
    request5 = new Request("A33", LocalDateTime.now(), PlaneTypes.BOEING7879, "PH_AKB", "Tires Cart", 0, "Nose", "Finished", null);

    userController.createUser(runner);
    userController.createUser(mechanic);

    if (userController.getAllUsers().size() == 0) {
      throw new NullPointerException("No users added, tests can't function");
    }
  }

  @Test
  @Order(1)
  void getAllRequests() {
    assertEquals(6, requestController.getAllRequests().size());
  }

  /**
   * Test adds a single request to the mechanic
   * <p>
   * Total Requests before method: 6
   * Total Requests after method: 7
   */
  @Test
  @Order(2)
  void addSingleNewRequestToUser() {
    assertEquals(6, requestController.getAllRequests().size());
    requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request1});
    assertEquals(7, requestController.getAllRequests().size());
  }

  /**
   * Test adds multiple requests to the same mechanic in a single call to the addNewRequestToUser method
   * <p>
   * Total Requests before method: 7
   * Total Requests after method: 1
   */
  @Test
  @Order(3)
  void addMultipleNewRequestToUser() {
    assertEquals(7, requestController.getAllRequests().size());
    requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request2, request3, request4, request5});
    assertEquals(11, requestController.getAllRequests().size());
  }


  /**
   * getRequests throws an exception when a call is made to the getRequests method when the id parameter is either null/0
   * or no requests exist with that id, otherwise it returns the id.
   */
  @Test
  @Order(4)
  void getRequest() {
    RequestNotFoundException exception = assertThrows(RequestNotFoundException.class, () -> {
      requestController.getRequest(69);
    });

    assertEquals("Melding met id: 69 is niet gevonden.", exception.getMessage());
    assertEquals(501, requestController.getRequest(501).getId());
  }

  /**
   * getChangedRequests method should only return requests from the mechanic itself, and an empty list if there aren't
   * any changes to the mechanics own requests even when there are updates to other mechanics' requests.
   * <p>
   * Total Requests before method: 11
   * Total Requests after method: 13
   */
  @Test
  @Order(5)
  void getChangedRequestsMechanic() {
    assertEquals(0, requestController.getChangedRequests(mechanic.getId()).size());
    requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request1});
    requestController.addNewRequestToUser(1001, new Request[]{request2});
    assertEquals(1, requestController.getChangedRequests(mechanic.getId()).size());
  }

  /**
   * Test should return all 12 previously made requests, since they've been made withing the 10 second interval, the
   * runner which is identified by id 0 in this method should get every updated or new request.
   * <p>
   * Total Requests before method: 13
   * Total Requests after method: 15
   */
  @Test
  @Order(6)
  void getChangedRequestsRunner() {
    assertEquals(12, requestController.getChangedRequests(0).size());
    requestController.addNewRequestToUser(mechanic.getId(), new Request[]{request1});
    requestController.addNewRequestToUser(1001, new Request[]{request2});
    assertEquals(14, requestController.getChangedRequests(0).size());
  }

  /**
   * Test updates the status of a request by its id and changes it
   * <p>
   * Doesn't add or remove requests
   */
  @Test
  @Order(7)
  void updateRequest() {
    assertEquals("Delivered", requestController.getRequest(501).getStatus());
    requestController.updateRequest(501, "Pending");
    assertEquals("Pending", requestController.getRequest(501).getStatus());
  }

  /**
   * Test should return 1 less request after the creation time and updated time have been reduced by 10 or more seconds,
   * 10 seconds has been defined in the request controller and front-end
   * <p>
   * Doesn't add or remove requests
   */
  @Test
  @Order(8)
  void getChangedRequestsTime() {
    assertEquals(14, requestController.getChangedRequests(0).size());
    requestController.updateRequest(505, "Delivered");
    assertEquals(15, requestController.getChangedRequests(0).size());
  }

  /**
   * Test adds a new cart by its ID to the request
   * <p>
   * Doesn't add or remove requests
   */
  @Test
  @Order(9)
  void addCartToRequest() {
    assertEquals(0, requestController.getRequest(500).getSelectedWagon());
    requestController.addCartToRequest(2, (long) 500);
    assertEquals(2, requestController.getRequest(500).getSelectedWagon());
  }


  /**
   * Test removes a single request from the list of all requests, and tests if that specific request has been deleted
   * throws exception that the request doesn't exist after deleting the request
   * <p>
   * Total Requests before method: 15
   * Total Requests after method: 14
   */
  @Test
  @Order(10)
  void deleteRequestById() {
    assertEquals(15, requestController.getAllRequests().size());
    requestController.deleteRequestById(501);
    assertEquals(14, requestController.getAllRequests().size());

    RequestNotFoundException exception = assertThrows(RequestNotFoundException.class, () -> {
      requestController.getRequest(501);
    });

    assertEquals("Melding met id: 501 is niet gevonden.", exception.getMessage());
  }
}
