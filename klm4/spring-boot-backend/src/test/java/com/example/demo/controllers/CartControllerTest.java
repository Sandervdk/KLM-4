package com.example.demo.controllers;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.enums.CartTypes;
import com.example.demo.enums.EquipmentStatus;
import com.example.demo.models.Cart;
import com.example.demo.repositories.CartRepository;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;

import static org.junit.jupiter.api.Assertions.*;

/**
 * This class is for testing the CartsController and its functionalities
 * <p>
 * IMPORTANT: Tests should be run all together, since the database doesn't empty after every request so the number of
 * requests keeps increasing for each test
 *
 * @author Acdaling Edusei
 */
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class CartControllerTest {
  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  CartRepository cartRepository;

  @Autowired
  EntityManager entityManager;

  private Cart nitrogenCart;
  private Cart nitrogenCartOne;
  private Cart nitrogenCartTwo;
  private Cart skydrolwagonOne;
  private Cart skydrolwagonTwo;
  private Cart skydrolWagonThree;
  private Cart coolingCartOne;

  /**
   * The test starts off with 10 standard requests from the data.sql file
   */
  @BeforeEach
  public void createCarts() {
    assertNotNull(application);
    nitrogenCart = new Cart("NitrogenCart 1", 500, 265, CartTypes.NITROGENCART, EquipmentStatus.AVAILABLE);
    nitrogenCartOne = new Cart("NitrogenCart 2", 500, 265, CartTypes.NITROGENCART, EquipmentStatus.AVAILABLE);
    nitrogenCartTwo = new Cart("NitrogenCart 3", 500, 265, CartTypes.NITROGENCART, EquipmentStatus.AVAILABLE);
    skydrolwagonOne = new Cart("SKYDROLWAGEN 1", 500, 265, CartTypes.SKYDROLWAGEN, EquipmentStatus.AVAILABLE);
    skydrolwagonTwo = new Cart("SKYDROLWAGEN 2", 500, 265, CartTypes.SKYDROLWAGEN, EquipmentStatus.IN_USE);
    skydrolWagonThree = new Cart("SKYDROLWAGEN 3", 500, 265, CartTypes.SKYDROLWAGEN, EquipmentStatus.AVAILABLE);
    coolingCartOne = new Cart("COOLING_CART 1", 500, 265, CartTypes.COOLING_CART, EquipmentStatus.AVAILABLE);

    if (cartRepository.findAll().size() == 0) {
      throw new NullPointerException("No users added, tests can't function");
    }
  }

  /**
   * This will check the amount of Carts defined in the data.sql
   */
  @Test
  @Order(1)
  void getAllCarts() {
    assertEquals(10, cartRepository.findAll().size());
  }

  /**
   * This test adds Carts to the database and makes the total size of Carts
   * in the database 17
   */
  @Test
  @Order(2)
  void addCarts() {
    cartRepository.addCart(nitrogenCart);
    cartRepository.addCart(nitrogenCartOne);
    cartRepository.addCart(nitrogenCartTwo);
    cartRepository.addCart(skydrolwagonOne);
    cartRepository.addCart(skydrolwagonTwo);
    cartRepository.addCart(skydrolWagonThree);
    cartRepository.addCart(coolingCartOne);
    assertEquals(17, cartRepository.findAll().size());
  }

  @Test
  @Order(3)
  void checkStatus() {
    cartRepository.findAll().stream().forEach(cart -> {
      if (cart.equals(nitrogenCartOne)) {
        assertEquals(EquipmentStatus.AVAILABLE, cart.getEquipmentStatus());
      }
    });
  }


  /**
   * This method will check if the id of a Cart is equal to the id that is in the database
   */
  @Test
  @Order(4)
  void checkId() {
    cartRepository.findAll().stream().forEach(cart -> {
      if (cart.equals(skydrolwagonTwo)) {
        Cart testCart = cartRepository.findByQuery("Find_by_id", skydrolwagonTwo.getID()).get(0);
        assertEquals(testCart.getID(), cart.getID());
      }
    });
  }

  /**
   * This method is going to check if the type of a wagon is equal to the test Cart added to the
   * Database
   */
  @Test
  @Order(5)
  void checkType() {
    cartRepository.findByQuery("Find_by_type", CartTypes.NITROGENCART).stream().forEach(cart -> {
      if (cart.equals(nitrogenCartTwo)) {
        assertEquals(cart.getCarttype(), nitrogenCartTwo.getCarttype());
      }
    });
  }

  /**
   * This test will change the status of a Cart to another status and check if the status
   * has changed correctly
   */
  @Test
  @Order(6)
  void updateCartStatus() {
    cartRepository.findByQuery("Find_by_type", CartTypes.NITROGENCART).stream().forEach(cart -> {
      if (cart.equals(nitrogenCartTwo)) {
        cartRepository.updateStatus("Change_status", cart.getID(), EquipmentStatus.UNAVAILABLE);
        Cart cartFromDatabase = cartRepository.findByQuery("Find_by_id", cart.getID()).get(0);
        assertEquals(EquipmentStatus.UNAVAILABLE, cartFromDatabase.getEquipmentStatus());
      }
    });
  }

  /**
   * This test will remove the testCarts from the database and bring the total of Carts
   * in the database back to 10
   */
  @Test
  @Order(7)
  void deleteCartTest() {
    for (Cart cart : cartRepository.findAll()) {
      if (cart.equals(skydrolwagonTwo)) {
        cartRepository.deleteCart(skydrolwagonTwo.getID());
        assertEquals(10, cartRepository.findAll().size());
      }
    }
  }

  /**
   * Through the endpoint of /carts in combination with the parameters
   * type and id user can get specific carts
   * <p>
   * Here we get a cart by using a id
   */
  @Test
  @Order(8)
  void checkIfIdMatch() {
    Cart cart = cartRepository.findById(50);
    assertEquals(50, cart.getID());
  }

  /**
   * Through the endpoint of /change-status in combination with the parameters
   * id and status, the user can change the status of a specific Cart
   */
  @Test
  @Order(9)
  void checkIfStatusChange() {
    assertEquals(EquipmentStatus.IN_USE, cartRepository.findById(50).getEquipmentStatus());
    cartRepository.updateStatus("Change_status", 50, EquipmentStatus.UNAVAILABLE);
    assertEquals(EquipmentStatus.UNAVAILABLE, cartRepository.findById(50).getEquipmentStatus());
  }


  /**
   * Through the endpoint of /change-status in combination with the parameters
   * id and status, the user can change the status of a specific Cart
   */
  @Test
  @Order(10)
  void checkIfCurrentCartRemoved() {
    assertEquals(true, cartRepository.findById(50));
    cartRepository.updateStatus("Change_status", 50, EquipmentStatus.UNAVAILABLE);
    assertEquals(EquipmentStatus.UNAVAILABLE, cartRepository.findById(50).getEquipmentStatus());
  }
}
