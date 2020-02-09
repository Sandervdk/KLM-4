package com.example.demo.repositories;

/**
 * @author: Sagi Lalee, 500695726
 */

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.enums.Functions;
import com.example.demo.models.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UserRepositorieTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  UserRepositorie userRepositorie;

  /**
   * There are 4 users created in the data.sql file.
   */
  @Test
  void findAllUsers() {
    assertEquals(4, userRepositorie.findAllUsers().size());
  }

  /**
   * check if the values of the new users are correct.
   */
  @Test
  void checkValuesOfNewUsers() {
    User runner = new User("test@klm.nl", "password", "test", "Runner", Functions.RUNNER);
    User mechanic = new User("test2@klm.nl", "password", "test", "Mechanic", Functions.MECHANIC);
    User admin = new User("test3@klm.nl", "password", "test", "Admin", Functions.ADMIN);

    assertThat(runner.getFirstname(), startsWith("tes"));
    assertThat(mechanic.getLastname(), endsWith("nic"));
    assertThat(admin.getEmail(), containsString("@klm.nl"));
  }

  /**
   * Gets the user with id=1001 from the data.sql file and checks if the firstnamae, lastname and password is correct.
   * checks if the user is not a null value and from the same class
   */
  @Test
  void findUser() {
    User user = userRepositorie.findUser(1001);

    assertThat(user, is(notNullValue()));
    assertThat(user, is(instanceOf(User.class)));

    assertEquals(user.getFirstname(), "Mechanic");
    assertEquals(user.getLastname(), "mac");
    assertEquals(user.getPassword(), "Welkom01");
  }

  @Test
  void deleteUserById() {
    assertEquals(4, userRepositorie.findAllUsers().size());
    userRepositorie.deleteUserById(1002);
    assertEquals(3, userRepositorie.findAllUsers().size());
  }
}
