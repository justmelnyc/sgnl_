import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../services/auth'

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };
@Component({
  selector: 'account-login',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="login()">

      <h3>Existing User Login</h3>
      <a class="btn button is-small" routerLink="/accounts-create">New Account?</a>
      <hr>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" class="input form-control"
               formControlName="email" required>

        <div *ngIf="formErrors.email" class="help is-invalid">
          {{ formErrors.email }}
        </div>

        <label for="password">Password</label>
        <input type="password" id="password" class="input form-control"
               formControlName="password" required
               >

        <div *ngIf="formErrors.password" class="notification help invalid-feedback">
          {{ formErrors.password }}
        </div>


      </div>

      
      <button type="submit" class="button is-primary" [disabled]="!userForm.valid">Log In</button>

      <span *ngIf="userForm.valid" class="help valid-feedback">Form Looks Valid</span>

      <!--<a *ngIf="!passReset && userForm.controls.email.valid" class="help is-info" (click)="resetPassword()">Reset Password for {{userForm.value.email}}?</a>-->
      <p *ngIf="passReset" class="help is-info">Reset requested. Check your email instructions.</p>

    </form>
  `,
  styles: []
})
export class AccountLoginComponent implements OnInit {

  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };


  constructor(private fb: FormBuilder, private auth: AuthService) { }


  get email() { return this.userForm.get('email') }
  get password() { return this.userForm.get('password') }

  ngOnInit() {
    this.buildForm();
  }

  login() {
    this.auth.emailLogin(this.userForm.value['email'], this.userForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }
  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }
}
