package com.example.demo.models;

import com.example.demo.enums.MeldingStatus;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.enums.WagonTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.Objects;

@Entity
public class Request {

  @Id
  @GeneratedValue
  private long id;

  private String locatie, positie;

  private LocalTime tijd, deadline;
  private PlaneTypes typeVliegtuig;
  private WagonTypes wagonTypes;
  private MeldingStatus status;

//  @CreatedDate
//  private LocalTime requestCreated;
//
//  @LastModifiedDate
//  private LocalTime requestUpdated;
//
//  private LocalTime deadline;

  @ManyToOne(fetch = FetchType.LAZY)
  private User user;

  protected Request(){}

  //Constructor with no id. This will be generated.
  public Request(String locatie, LocalTime deadline, PlaneTypes typeVliegtuig, WagonTypes wagonTypes, String positie, LocalTime tijd, MeldingStatus status) {
    this.locatie = locatie;
    this.deadline = deadline;
    this.typeVliegtuig = typeVliegtuig;
    this.wagonTypes = wagonTypes;
    this.positie = positie;
    this.tijd = tijd;
    this.status = status;
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

  public String getLocatie() {
    return locatie;
  }

  public void setLocatie(String locatie) {
    this.locatie = locatie;
  }

  public LocalTime getDeadline() {
    return deadline;
  }

  public void setDeadline(LocalTime deadline) {
    this.deadline = deadline;
  }

  public PlaneTypes getTypeVliegtuig() {
    return typeVliegtuig;
  }

  public void setTypeVliegtuig(PlaneTypes typeVliegtuig) {
    this.typeVliegtuig = typeVliegtuig;
  }

  public WagonTypes getEquipment() {
    return wagonTypes;
  }

  public void setEquipment(WagonTypes wagonTypes) {
    this.wagonTypes = wagonTypes;
  }

  public String getPositie() {
    return positie;
  }

  public void setPositie(String positie) {
    this.positie = positie;
  }

  public LocalTime getTijd() {
    return tijd;
  }

  public void setTijd(LocalTime tijd) {
    this.tijd = tijd;
  }

  public MeldingStatus getStatus() {
    return status;
  }

  public void setStatus(MeldingStatus status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "Melding{" +
      "id=" + id +
      ", locatie='" + locatie + '\'' +
      ", deadline=" + deadline +
      ", typeVliegtuig=" + typeVliegtuig +
      ", equipment=" + wagonTypes +
      ", positie='" + positie + '\'' +
      ", tijd=" + tijd +
      ", meldingStatus=" + status +
      '}';
  }
}

