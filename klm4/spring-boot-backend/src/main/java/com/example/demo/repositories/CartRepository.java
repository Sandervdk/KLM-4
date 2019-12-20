package com.example.demo.repositories;

import com.example.demo.enums.CartTypes;
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
    return this.findByQuery("All_carts", null);
  }

  public List<Cart> findByQuery(String jpqlName, Object param) {
    TypedQuery<Cart> query = this.entityManager.createNamedQuery(jpqlName, Cart.class);

    if (param != null) {
      query.setParameter("carttype", param);
    }

    return query.getResultList();
  }
}
