import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SantaService } from '../services/santaService.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _svc: SantaService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    //this._svc.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/children';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this._svc.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Login Successful!');
          this.router.navigate(['children']);
        },
        error => {
          alert('Error Loggin In. \nCheck Logs and Try again.');
          console.log('Error Logging In: ' + JSON.stringify(error));
          this.router.navigate(['/login']);
          this.loading = false;
          this.loginForm.reset();
        });
  }
}
