package com.example.demo.repositories;

import com.example.demo.enums.MeldingStatus;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.enums.WagonTypes;
import com.example.demo.models.Melding;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Component
@Repository
public class MeldingRepositorie {

  private long idCounter = 2;

  private List<Melding> meldingen = new ArrayList<>();

  public MeldingRepositorie() {
    this.meldingen.add(new Melding(1, "F5", "14:15", PlaneTypes.Boeing737, WagonTypes.BANDENWAGEN, "test", "10:10", MeldingStatus.Afgerond));
    this.meldingen.add(new Melding(2, "F5", "14:15", PlaneTypes.AirbusA330, WagonTypes.SKYDROLWAGEN, "test", "10:10", MeldingStatus.Afgerond));
  }

  public List<Melding> findAll() {
    return this.meldingen;
  }

  //ADD a new melding and increment the id. This will be replaced later with JPA
  public Melding saveMelding(Melding newMelding) {
    if (newMelding.getId() == 0) {
      newMelding.setId(++idCounter);
    }
    this.meldingen.add(newMelding);
    return newMelding;
  }

  //Find a melding
  public Melding findMeldingByID(long id) {
    for (Melding melding : meldingen) {
      if (melding.getId() == id) {
        return melding;
      }
    }
    return null;
  }

  //TODO make a method to update a 'Melding' with the id.

  //DELETE a melding
  public Melding deleteMeldingByID(long id) {

    Iterator<Melding> iterator = meldingen.iterator();
    while (iterator.hasNext()) {
      Melding event = iterator.next();

      if (event.getId() == id) {
        iterator.remove();
        return event;
      }
    }
    return null;
  }


}
