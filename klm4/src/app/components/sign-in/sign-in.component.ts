import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @ViewChild('signInForm', {static: false}) private signInForm: NgForm;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  /**
   * Should have a better name, but will change in future
   */
  nextScreen() {
    this.router.navigate(['/map'], {
      relativeTo: this.route
    });
  }

  test() {
    console.log(this.signInForm);
  }

}
