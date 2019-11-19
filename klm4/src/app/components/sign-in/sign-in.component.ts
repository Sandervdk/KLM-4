import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public showWarning = null; // to show warning message
  public animationQueue = false;

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit() {
  }

  /**
   * This method will take the username and password from the filled in form and
   * show message on the screen when login went wrong.
   */
  signIn(signInForm: NgForm) {
    const username: string = signInForm.form.value.email;
    const password: string = signInForm.form.value.password;

    // set an animation screen before login
    this.animationQueue = true;
    setTimeout(() => {
      if (this.authentication.login(username, password)) {
        this.showWarning = false;
        this.animationQueue = false;
      } else {
        this.showWarning = true;
        this.animationQueue = false;
      }
    }, 1500);
  }

}
