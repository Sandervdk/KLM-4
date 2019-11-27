package com.example.demo.models;

import com.example.demo.enums.MeldingStatus;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.enums.WagonTypes;

import java.time.LocalDateTime;
import java.util.Date;

public class Melding {

  private long id;
  private String locatie, positie;
  private LocalDateTime tijd, deadline;
  private PlaneTypes typeVliegtuig;
  private WagonTypes wagonTypes;
  private MeldingStatus status;

  public Melding(){}

  public Melding(long id, String locatie, LocalDateTime deadline, PlaneTypes typeVliegtuig, WagonTypes wagonTypes, String positie, LocalDateTime tijd, MeldingStatus status) {
    this.id = id;
    this.locatie = locatie;
    this.deadline = deadline;
    this.typeVliegtuig = typeVliegtuig;
    this.wagonTypes = wagonTypes;
    this.positie = positie;
    this.tijd = tijd;
    this.status = status;
  }

  public long getId() {
    return id;
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

  public LocalDateTime getDeadline() {
    return deadline;
  }

  public void setDeadline(LocalDateTime deadline) {
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

  public LocalDateTime getTijd() {
    return tijd;
  }

  public void setTijd(LocalDateTime tijd) {
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

