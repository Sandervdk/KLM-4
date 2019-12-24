package com.example.demo.repositories;

import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Repository
@Transactional
public class UserRepositorie {

  @Autowired
  protected EntityManager entityManager;

  //Find all users. Shows message that it can't resolve 'user' but it works.
  public List<User> findAllUsers() {
    TypedQuery<User> find_all_users = entityManager.createQuery("select u from User u", User.class);
    return find_all_users.getResultList();
  }

  //find a user
  public User findUserByEmail(String email) {
    return entityManager.find(User.class, email);
  }

  //insert or update a user
  public User save(User user) {
    if (user.getId() == 0) {
      entityManager.persist(user);
    } else {
      entityManager.merge(user);
    }
    return user;
  }

  //delete a user
  public User deleteUserByEmail(String email){
    User deleteUser = this.findUserByEmail(email);
    entityManager.remove(deleteUser);
    return deleteUser;
  }



  /*
  private long idCounter = 3;

  private List<User> users = new ArrayList<>();

  public UserRepositorie() {
    users.add(new User("Runner", "RunnerKLM", "runner@klm.nl", "Welkom01", Functions.RUNNER, 1));
    users.add(new User("Mechanic", "MechanicKLM", "mechanic@klm.nl", "Welkom01", Functions.MECHANIC, 2));
    users.add(new User("Admin", "AdminKLM", "admin@klm.nl", "Welkom01", Functions.ADMIN, 3));
  }

  public List<User> findAll() {
    return users;
  }

  //Will increment the id of the new user. This will be replaced with JPA later.
  public User save(User user) {
    if (user.getId() == 0){
      user.setId(++idCounter);
    }
    users.add(user);

    return user;
  }

  public User findUser(long id) {
    for (User user : users) {
      if (user.getId() == id) {
        return user;
      }
    }
    return null;
  }

  //DELETE a user
  public User deleteUserByID(long id) {

    Iterator<User> iterator = users.iterator();
    while (iterator.hasNext()) {
      User user = iterator.next();

      if (user.getId() == id) {
        iterator.remove();
        return user;
      }
    }
    return null;
  }
  */
}
