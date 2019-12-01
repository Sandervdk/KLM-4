package com.example.demo.repositories;

import com.example.demo.enums.MeldingStatus;
import com.example.demo.enums.PlaneTypes;
import com.example.demo.enums.WagonTypes;
import com.example.demo.models.Melding;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

@Component
@Repository
@Transactional
public class MeldingRepositorie {

  @Autowired
  protected EntityManager entityManager;

  //Find all users. Shows message that it can't resolve 'user' but it works.
  public List<Melding> findAll() {
    TypedQuery<Melding> findAllMeldings = entityManager.createQuery("select m from Melding m", Melding.class);
    return findAllMeldings.getResultList();
  }


  //find a user
  public Melding findMelding(long id) {
    return entityManager.find(Melding.class, id);
  }

  //insert or update a user
  public Melding save(Melding melding) {
    if (melding.getId() == 0) {
      entityManager.persist(melding);
    } else {
      entityManager.merge(melding);
    }
    return melding;
  }

  //delete a user
  public Melding deleteMelding(long id){
    Melding deleteMelding = this.findMelding(id);
    entityManager.remove(deleteMelding);
    return deleteMelding;
  }

  /*
  private long idCounter = 2;

  private List<Melding> meldingen = new ArrayList<>();

  public MeldingRepositorie() {
    this.meldingen.add(new Melding("F5", LocalDateTime.now(), PlaneTypes.Boeing737, WagonTypes.BANDENWAGEN, "test", LocalDateTime.now(), MeldingStatus.Afgerond));
    this.meldingen.add(new Melding( "F5", LocalDateTime.now(), PlaneTypes.AirbusA330, WagonTypes.SKYDROLWAGEN, "test", LocalDateTime.now(), MeldingStatus.Afgerond));
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
*/

}
