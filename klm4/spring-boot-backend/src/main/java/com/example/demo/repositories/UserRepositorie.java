package com.example.demo.repositories;

import com.example.demo.enums.Functions;
import com.example.demo.models.User;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Component
@Repository
public class UserRepositorie {
  private int idCounter = 3;

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

  public User findUser(int id) {
    for (User user : users) {
      if (user.getId() == id) {
        return user;
      }
    }

    return null;
  }
}
