package com.example.demo.repositories;

import com.example.demo.models.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public class CartRepository {

  @Autowired
  EntityManager entityManager;

  public List<Cart> findAll() {
    TypedQuery<Cart> query = this.entityManager.createQuery("SELECT c FROM Cart c", Cart.class);
    return query.getResultList();
  }
}
