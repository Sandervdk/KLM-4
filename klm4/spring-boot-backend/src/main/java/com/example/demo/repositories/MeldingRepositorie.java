package com.example.demo.repositories;

import com.example.demo.models.Request;
import com.example.demo.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;
import java.util.List;

@Component
@Repository
@Transactional
public class MeldingRepositorie {

  @Autowired
  protected EntityManager entityManager;

  @Autowired
  protected UserRepositorie userRepositorie;

  //Find all requests
  public List<Request> findAll() {
    TypedQuery<Request> findAllMeldings = entityManager.createQuery("select r from Request r ", Request.class);
    return findAllMeldings.getResultList();
  }

  //find a request
  public Request findRequest(long id) {
    return entityManager.find(Request.class, id);
  }

  //delete a request
  public Request deleteRequest(long id) {
    Request deleteRequest = this.findRequest(id);
    entityManager.remove(deleteRequest);
    return deleteRequest;
  }

  public Request addRequestsToUser(long userId, Request request) {
    //find a user
    User user = userRepositorie.findUser(userId);
    //add the request to user and set the relations
    user.addMelding(request);
    request.setUser(user);
    //save to the database
    entityManager.persist(request);
    return request;
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
