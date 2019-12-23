package com.example.demo.repositories;

import com.example.demo.models.Cart;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
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

  public List<Cart> findByQuery(String jpqlName, Object... param) {
    TypedQuery<Cart> query = this.entityManager.createNamedQuery(jpqlName, Cart.class);
    switch (jpqlName) {
      case "Find_by_type":
        query.setParameter("carttype", param[0]);
        break;
      case "Find_by_id":
        query.setParameter("id", param[0]);
        break;
    }
    return query.getResultList();
  }

  /**
   * This method will update the status of a Cart, this is an separate method because UPDATE & DELETE queries
   * don't make use of TypedQueries<E>
   *
   * @param jpqlName the name of the NamedQuery
   * @param param    the parameters given
   */
  public void updateStatus(String jpqlName, Object... param) {
    Query query = this.entityManager.createNamedQuery(jpqlName);
    query.setParameter("id", param[0]);
    query.setParameter("status", param[1]);
    query.executeUpdate();
  }
}
