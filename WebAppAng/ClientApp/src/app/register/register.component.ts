import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SantaService } from '../services/santaService.service';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _svc: SantaService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this._svc.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('Registration Successful ! Data: ' + JSON.stringify(data));
          this.router.navigate(['/login']);
        },
        error => {
          alert('Registration Failed ! Data: ' + JSON.stringify(error));
          this.loading = false;
        });
  }
}
