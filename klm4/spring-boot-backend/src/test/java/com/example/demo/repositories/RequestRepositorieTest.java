package com.example.demo.repositories;
/**
 * @author Ali Butt
 */

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.controllers.RequestController;
import com.example.demo.enums.CartTypes;
import com.example.demo.enums.EquipmentStatus;
import com.example.demo.enums.Functions;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.models.Cart;
import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class RequestRepositorieTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  private RequestRepositorie requestRepositorie;

  @Autowired
  protected UserRepositorie userRepositorie;

  private User runner;
  private User mechanic;
  private Request request1;
  private Request request2;
  private Request request3;
  private Request request4;
  private Request request5;
  private Request request6;
  private Request request7;
  private Cart cart1;

  @BeforeEach
  private void createRequests() {
    assertNotNull(application);
    runner = new User("runner@klm.nl", "password", "Run", "ner", Functions.RUNNER);
    mechanic = new User("mechanic@klm.nl", "password", "mech", "anic", Functions.MECHANIC);

    request1 = new Request("C2", LocalDateTime.now(), PlaneTypes.AIRBUSA330200, "PH_AKB", "Nitrogen Cart", 0, "Left", "Pending", null);
    request2 = new Request("B5", LocalDateTime.now(), PlaneTypes.AIRBUSA330300, "PH_AKB", "Tires Cart", 0, "Right", "Pending", null);
    request3 = new Request("F2", LocalDateTime.now(), PlaneTypes.BOEING747400, "PH_AKB", "Skydrol Cart", 0, "Nose", "Delivered", null);
    request4 = new Request("G7", LocalDateTime.now(), PlaneTypes.BOEING737800, "PH_AKB", "Nitrogen Cart", 0, "Right", "Pending", null);
    request5 = new Request("A33", LocalDateTime.now(), PlaneTypes.BOEING7879, "PH_AKB", "Tires Cart", 0, "Nose", "Finished", null);
    request6 = new Request("A1", LocalDateTime.now(), PlaneTypes.BOEING7879, "PH_AKB", "Tires Cart", 0, "Nose", "Finished", null);
    request7 = new Request("A9", LocalDateTime.now(), PlaneTypes.BOEING7879, "PH_AKB", "Tires Cart", 0, "Nose", "Finished", null);

    cart1 = new Cart( "NITROGENCART", 4.761736,52.302916, CartTypes.NITROGENCART, EquipmentStatus.AVAILABLE);

    userRepositorie.save(runner);
    userRepositorie.save(mechanic);

    if (userRepositorie.findAllUsers().size() == 0) {
      throw new NullPointerException("No users added, tests can't function");
    }
  }

  /**
   * alle meldingen worden opgehaald
   * het zijn er standaard 6 in het begin door de data.sql file
   */
  @Test()
  @Order(1)
  void findAll() {
    assertEquals(6, requestRepositorie.findAll().size());
  }

  /**
   * de eerstvolgende beschikbare id in de database is 1007
   * met de methode hieronder controleren we of het de juiste ID wordt gegenereerd
   */
  @Test
  @Order(2)
  void generateId() {
    assertEquals(1007, runner.getId());
    assertEquals(1008, mechanic.getId());
  }

  /**
   * controleert of de request aan de runner wordt gekoppelt
   *
   */
  @Test
  @Order(3)
  void addRequestsToUser() {
    requestRepositorie.addRequestsToUser(runner.getId(), request7);
    requestRepositorie.addRequestsToUser(runner.getId(), request5);

    assertEquals(1009, request5.getUser().getId());
  }

  /**
   * in de vorige test zijn er 2 requests toegevoegd aan de 6 bestaande requests
   * nu horen er 8 requests te bestaan
   */
  @Test
  @Order(4)
  void findAllSecondTest() {
    assertEquals(8, requestRepositorie.findAll().size());
  }

  /**
   * bindt de juiste cart aan de request
   * in de eerste instantie is het 0
   * na het toevoegen hoort de selected_wagon ID 53 te zijn
   */
  @Test
  @Order(5)
  void addCartToRequest() {
    long id = 500;
    requestRepositorie.findRequest(id);
    assertEquals(0, requestRepositorie.findRequest(id).getSelectedWagon());
    requestRepositorie.addCartToRequest(53, id);

    assertEquals(53, requestRepositorie.findRequest(id).getSelectedWagon());
  }

  /**
   * request met ID 500 wordt verwijderd
   * voorheen waren er 8 meldingen
   * daarna zijn er nog 7 over
   */
  @Test
  @Order(6)
  void deleteRequest() {
    assertEquals(8, requestRepositorie.findAll().size());
    requestRepositorie.deleteRequest(500);
    assertEquals(7, requestRepositorie.findAll().size());
  }
}
