package com.example.demo.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserDaoService service; // creates an instance of the userDaoService

    //GET all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return service.findAll();
    }

    //FIND a specific user
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable int id) {
        return service.findUser(id);
    }

    //CREATE a new user
    @PostMapping("/users")
    public void createUser(@RequestBody User user) {
     service.save(user);
    }
}
