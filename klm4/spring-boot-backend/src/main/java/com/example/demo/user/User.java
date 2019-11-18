package com.example.demo.user;

import com.example.demo.enums.Functions;

public class User {
  private int id;
  private String email, password, firstname, lastname;
  private Functions role;

  public User() {}

  public User(String firstname, String lastname, String email, String password, Functions role, int id) {
    this.email = email;
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.id = id;
    this.role = role;
  }

  public int getId() {
    return id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstname() {
    return firstname;
  }

  public void setFirstname(String firstname) {
    this.firstname = firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public void setLastname(String lastname) {
    this.lastname = lastname;
  }

  public String getRole() {
    return role.toString();
  }

  public void setRole(Functions role) {
    this.role = role;
  }

  @Override
  public String toString() {
    return "User{" +
      "id=" + id +
      ", username='" + email + '\'' +
      ", password='" + password + '\'' +
      ", firstname='" + firstname + '\'' +
      ", lastname='" + lastname + '\'' +
      '}';
  }
}
