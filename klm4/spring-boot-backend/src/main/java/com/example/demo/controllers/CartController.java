package com.example.demo.controllers;

import com.example.demo.enums.CartTypes;
import com.example.demo.models.Cart;
import com.example.demo.repositories.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CartController {
  @Autowired
  CartRepository cartRepository;

  @GetMapping("/carts")
  public List<Cart> getAllCarts(
    @RequestParam(required = false, name = "type") CartTypes cartType) {

    if (cartType != null && !cartType.toString().isEmpty()) {
      return this.cartRepository.findByQuery("Find_by_type", cartType);
    }

    return this.cartRepository.findAll();
  }
}