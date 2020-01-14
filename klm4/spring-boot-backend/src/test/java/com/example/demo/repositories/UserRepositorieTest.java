package com.example.demo.repositories;

/**
 * @Author Ali Butt
 */

import com.example.demo.KlmSpringBootApplication;
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

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UserRepositorieTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  UserRepositorie userRepositorie;


  private User runner;
  private User mechanic;
  private User admin;

  /**
   * voor iedere test wodt onderstaande gegevens aangemaakt
   */
  @BeforeEach
  private void createUsers() {
    assertNotNull(application);
    runner = new User("runner@klm.nl", "password", "Run", "ner", Functions.RUNNER);
    mechanic = new User("mechanic@klm.nl", "password", "mech", "anic", Functions.MECHANIC);
    admin = new User("admin@klm.nl", "password", "ad", "min", Functions.ADMIN);

    if (userRepositorie.findAllUsers().size() == 0) {
      throw new NullPointerException("No users added, tests can't function");
    }
  }

  /**
   * voorafgaand hebben we al 4 user in de database staan
   */
  @Test
  @Order(1)
  void findAllUsers() {
    assertEquals(4, userRepositorie.findAllUsers().size());
  }

  @Test
  @Order(2)
  void save() {
    userRepositorie.save(runner);
    userRepositorie.save(mechanic);
    userRepositorie.save(admin);

    assertEquals(7, userRepositorie.findAllUsers().size());
  }

  @Test
  @Order(3)
  void findUser() {
    User user = userRepositorie.findUser(1005);

    assertEquals(user.getFirstname(), runner.getFirstname());
    assertEquals(user.getLastname(), runner.getLastname());
    assertEquals(user.getPassword(), runner.getPassword());
  }

  @Test
  @Order(4)
  void deleteUserById() {
    assertEquals(7, userRepositorie.findAllUsers().size());
    userRepositorie.deleteUserById(1005);
    assertEquals(6, userRepositorie.findAllUsers().size());
  }
}
