package com.example.demo.user;

import com.example.demo.enums.Functions;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Component
@Repository
public class UserDaoService {
  private static List<User> users = new ArrayList<>();

  public UserDaoService() {
    this.users.add(new User("Runner", "RunnerKLM", "runner@klm.nl", "Welkom01", Functions.RUNNER, 0));
    this.users.add(new User("Mechanic", "MechanicKLM", "mechanic@klm.nl", "Welkom01", Functions.MECHANIC, 1));
    this.users.add(new User("Admin", "AdminKLM", "admin@klm.nl", "Welkom01", Functions.ADMIN, 2));
  }

  public List<User> findAll() {
    return users;
  }

  public User save(User user) {
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
