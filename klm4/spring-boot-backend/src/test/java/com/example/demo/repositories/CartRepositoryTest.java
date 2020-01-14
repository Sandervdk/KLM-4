/**
 *
 * @author Maninder Singh, 500804905
 */
package com.example.demo.repositories;

import com.example.demo.KlmSpringBootApplication;
import com.example.demo.controllers.CartController;
import com.example.demo.controllers.UserController;
import com.example.demo.enums.CartTypes;
import com.example.demo.enums.EquipmentStatus;
import com.example.demo.enums.Functions;
import com.example.demo.models.Cart;
import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)

class CartRepositoryTest {

  @Autowired
  KlmSpringBootApplication application = null;

  @Autowired
  EntityManager entityManager;

  @Autowired
  UserController userController;

  @Autowired
  CartRepository cartRepository;


  private Cart cart1;
  private Cart cart2;
  private Cart cart3;
  private Cart cart4;
  private Cart cart5;

  /**
   * de test start met de tien carts die al in de data.sql staan. hieronder voeg ik nog vijf carts toe om te testen.
   *
   */
  @BeforeEach
  private void createCarts() {
    assertNotNull(application);
    cart1 = new Cart( "NITROGENCART", 4.761736,52.302916, CartTypes.NITROGENCART, EquipmentStatus.AVAILABLE);
    cart2 = new Cart( "BrakesCart", 4.761736,52.302916, CartTypes.BRAKES_CART, EquipmentStatus.AVAILABLE);
    cart3 = new Cart( "FuelCart", 4.761736,52.302916, CartTypes.FUEL_CART, EquipmentStatus.AVAILABLE);
    cart4 = new Cart( "Skydrolwagen", 4.761736,52.302916, CartTypes.SKYDROLWAGEN, EquipmentStatus.IN_USE);
    cart5 = new Cart( "TireCart", 4.761736,52.302916, CartTypes.TIRECART, EquipmentStatus.UNAVAILABLE);

  }

  /**
   * met deze methode alle carts opgeteld. In de database staan al tien carts.
   */
  @Test
  @Order(1)
  void findAll() {
    assertEquals(10, cartRepository.findAll().size());
  }

  /**
   * met methode voeg ik vijf nieuwe carts
   *
   * aantal carts voor de methode = 10
   * aantal carts na de methode = 15
   */
  @Test
  @Order(2)
  void addCart() {
    cartRepository.addCart(cart1);
    cartRepository.addCart(cart2);
    cartRepository.addCart(cart3);
    cartRepository.addCart(cart4);
    cartRepository.addCart(cart5);
    assertEquals(15, cartRepository.findAll().size());
  }

  /**
   * met deze methode haal ik de carts met specifieke type op
   */
  @Test
  @Order(3)
  void findByQueryFindByType() {
    List<Cart> nitrogencarts = cartRepository.findByQuery("Find_by_type", CartTypes.NITROGENCART);
    for (int i = 0; i < nitrogencarts.size() ; i++) {
      assertEquals(CartTypes.NITROGENCART, nitrogencarts.get(0).getCarttype());

    }
  }

  /**
   * met deze methode haal ik de cart met specifieke id op
   */
  @Test
  @Order(4)
  void findByQueryFindByID() {
    for (Cart cartloop: cartRepository.findAll()){
      if(cartloop.equals(cart1)){
        Cart testCaRT = cartRepository.findByQuery("Find_by_id", cart1.getID()).get(0);
        assertEquals(testCaRT.getID(), cartloop.getID());
      }
    }
  }

  /**
   * met deze methode verander ik de status van de cart
   *
   * status van de cart voor deze methode = IN_USE
   * status van de cart na deze methode = UNAVAILABLE
   */

  @Test
  @Order(5)
  void updateStatus() {
    Cart cart = cartRepository.findByQuery("Find_by_id", 50).get(0);
    assertEquals(EquipmentStatus.IN_USE, cart.getEquipmentStatus());
    cartRepository.updateStatus("Change_status",50, EquipmentStatus.UNAVAILABLE);
    cart = cartRepository.findByQuery("Find_by_id", 50).get(0);
    assertEquals(EquipmentStatus.UNAVAILABLE, cart.getEquipmentStatus());

  }


}
