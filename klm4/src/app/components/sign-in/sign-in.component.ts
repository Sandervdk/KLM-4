import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Functions} from '../../models/staff/Functions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signInForm', {static: false}) private signInForm: NgForm;
  public showWarning = false;

  constructor(private authentication: AuthenticationService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  /**
   * This method will take the username and password from the filled in form and
   * show confirmation message
   */
  signIn() {
    const username: string = this.signInForm.form.value.email;
    const password: string = this.signInForm.form.value.password;
    if (this.authentication.login(username, password)) {
      // tslint:disable-next-line:max-line-length
      // console.log(`Created user with the name of ${this.authentication.getUser().getName()} and role of ${this.authentication.getUser().getRole()}`);
      this.showWarning = false;
      this.navigateUser(this.authentication.getUser());
    } else {
      this.showWarning = true;
    }
  }

  private navigateUser(user) {
    switch (user.getRole()) {
      case Functions.MECHANIC:
        this.router.navigate([], {
          relativeTo: this.route
        });
        break;
      case Functions.RUNNER:
        this.router.navigate([], {
          relativeTo: this.route
        });
        break;
    }
  }

}
