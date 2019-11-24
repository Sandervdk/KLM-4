package com.example.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class MeldingNotFoundException extends RuntimeException {
  public MeldingNotFoundException(String message) {
    super(message);
  }
}
