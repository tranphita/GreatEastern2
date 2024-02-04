import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  returnUrl = '/admin';
  error = '';
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // redirect to home if already logged in
    if (sessionStorage.getItem('auth-user')) {
      this.router.navigate(['/admin']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.f.username.value == 'admin' || this.f.username.value == 'reachforgreat') {
      if (this.f.password.value == '1Q2w3e4r5t' || this.f.password.value == 'Paris!@#2023') {

        var currentUser = {
          userid: this.f.username.value,
          role: 'admin',
        };

        window.sessionStorage.removeItem(USER_KEY);
        window.sessionStorage.setItem(USER_KEY, JSON.stringify(currentUser));
        this.router.navigate([this.returnUrl]);
      } else {
        this.error = 'Password faild';
        this.loading = false;
      }
    } else {
      this.error = 'User name faild';
      this.loading = false;
    }
  }
}
