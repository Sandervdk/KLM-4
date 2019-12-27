package com.example.demo.models;

import com.example.demo.enums.PlaneTypes;
import com.example.demo.enums.CartTypes;
import com.example.demo.enums.RequestStatus;
import com.example.demo.enums.TailTypes;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Entity
public class Request {

  @Id
  @GeneratedValue
  private long id;
  private String location;
  private LocalDateTime completionTime;
  private LocalDateTime deadline;

  @Enumerated(EnumType.STRING)
  private PlaneTypes planeType;

  private String tailType;
  private String wagonType;
  private String selectedWagon;
  private String position;
  private String status;
  private String extraInfo;

  @JsonIgnore
  @CreatedDate
  private LocalDateTime requestCreated;

  @JsonIgnore
  @LastModifiedDate
  private LocalDateTime requestUpdated;

  @JsonIgnore
  @ManyToOne(fetch = FetchType.LAZY)
  private User user;

  protected Request() {
  }

  public Request(String location, LocalDateTime completionTime, LocalDateTime deadline, PlaneTypes planeType, String tailType,
                 String wagonType, String selectedWagon, String position, String status, String extraInfo) {
    this.location = location;
    this.completionTime = completionTime;
    this.deadline = deadline;
    this.planeType = planeType;
    this.tailType = tailType;
    this.wagonType = wagonType;
    this.selectedWagon = selectedWagon;
    this.position = position;
    this.status = status;
    this.extraInfo = extraInfo;
  }


  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Request request = (Request) o;
    return id == request.id;
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public LocalDateTime getCompletionTime() {
    return completionTime;
  }

  public void setCompletionTime(LocalDateTime requestTime) {
    this.completionTime = requestTime;
  }

  public LocalDateTime getDeadline() {
    return deadline;
  }

  public void setDeadline(LocalDateTime deadline) {
    this.deadline = deadline;
  }

  public PlaneTypes getPlaneType() {
    return planeType;
  }

  public void setPlaneType(PlaneTypes planeType) {
    this.planeType = planeType;
  }

  public String getTailType() {
    return tailType;
  }

  public void setTailType(String tailType) {
    this.tailType = tailType;
  }

  public String getWagonType() {
    return wagonType;
  }

  public void setWagonType(String wagonType) {
    this.wagonType = wagonType;
  }

  public String getSelectedWagon() {
    return selectedWagon;
  }

  public void setSelectedWagon(String selectedWagon) {
    this.selectedWagon = selectedWagon;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getExtraInfo() {
    return extraInfo;
  }

  public void setExtraInfo(String extraInfo) {
    this.extraInfo = extraInfo;
  }

  public long getMechanicId() {
    return this.user.getId();
  }

  public LocalDateTime getRequestCreated() {
    return requestCreated;
  }

  public void setRequestCreated(LocalDateTime requestCreated) {
    this.requestCreated = requestCreated;
  }

  public LocalDateTime getRequestUpdated() {
    return requestUpdated;
  }

  public void setRequestUpdated(LocalDateTime requestUpdated) {
    this.requestUpdated = requestUpdated;
  }

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

}

