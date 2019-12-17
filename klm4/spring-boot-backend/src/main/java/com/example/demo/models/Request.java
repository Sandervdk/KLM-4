package com.example.demo.models;

import com.example.demo.enums.RequestStatus;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.enums.TailTypes;
import com.example.demo.enums.WagonTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Objects;

@Entity
public class Request {

  @Id
  @GeneratedValue
  private long id;

  private String position, selectedWagon, extraInfo;
  private LocalTime requestTime, deadline;
  private PlaneTypes planeType;
  private TailTypes tailTypes;
  private WagonTypes wagonTypes;
  private RequestStatus status;

  @CreatedDate
  private LocalDateTime requestCreated;
  @LastModifiedDate
  private LocalDateTime requestUpdated;

  @ManyToOne()
  private User user;

  protected Request() {
  }

  //Constructor with no id. This will be generated.
  public Request(String position, String selectedWagon, String extraInfo, PlaneTypes planeType, TailTypes tailTypes,
                 WagonTypes wagonTypes, RequestStatus status, LocalTime deadline, LocalTime requestTime, LocalDateTime requestCreated, LocalDateTime requestUpdated) {
  this.position = position;
  this.selectedWagon = selectedWagon;
  this.extraInfo = extraInfo;
  this.planeType = planeType;
  this.tailTypes = tailTypes;
  this.wagonTypes = wagonTypes;
  this.status = status;
  this.deadline = deadline;
  this.requestTime = requestTime;
  this.requestCreated = requestCreated;
  this.requestUpdated = requestUpdated;
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

  public User getUser() {
    return user;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public void setId(long id) {
    this.id = id;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getSelectedWagon() {
    return selectedWagon;
  }

  public void setSelectedWagon(String selectedWagon) {
    this.selectedWagon = selectedWagon;
  }

  public String getExtraInfo() {
    return extraInfo;
  }

  public void setExtraInfo(String extraInfo) {
    this.extraInfo = extraInfo;
  }

  public LocalTime getDeadline() {
    return deadline;
  }

  public void setDeadline(LocalTime deadline) {
    this.deadline = deadline;
  }

  public PlaneTypes getPlaneType() {
    return planeType;
  }

  public void setPlaneType(PlaneTypes planeType) {
    this.planeType = planeType;
  }

  public TailTypes getTailTypes() {
    return tailTypes;
  }

  public void setTailTypes(TailTypes tailTypes) {
    this.tailTypes = tailTypes;
  }

  public WagonTypes getWagonTypes() {
    return wagonTypes;
  }

  public void setWagonTypes(WagonTypes wagonTypes) {
    this.wagonTypes = wagonTypes;
  }

  public RequestStatus getStatus() {
    return status;
  }

  public void setStatus(RequestStatus status) {
    this.status = status;
  }

  public LocalTime getRequestTime() {
    return requestTime;
  }

  public LocalDateTime getRequestUpdated() {
    return requestUpdated;
  }

  @Override
  public String toString() {
    return "Request{" +
      "id=" + id +
      ", position='" + position + '\'' +
      ", selectedWagon='" + selectedWagon + '\'' +
      ", extraInfo='" + extraInfo + '\'' +
      ", deadline=" + deadline +
      ", planeType=" + planeType +
      ", tailTypes=" + tailTypes +
      ", wagonTypes=" + wagonTypes +
      ", status=" + status +
      ", requestTime=" + requestTime +
      ", requestUpdated=" + requestUpdated +
      ", user=" + user +
      '}';
  }
}

