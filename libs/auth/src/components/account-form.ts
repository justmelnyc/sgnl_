import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AngularFirestore } from 'angularfire2/firestore'
import { map, take, debounceTime } from 'rxjs/operators'
import {AuthService} from '../services/auth'


@Component({
  selector: 'account-form',
  template: `
   
    <ng-container *ngIf="(auth.user | async) || {} as user">

      <form [formGroup]="signupForm" *ngIf="!user.uid" (ngSubmit)="signup()">

        <h3>New User Signup</h3>
        <div class="form-group">

          <label for="email">Email</label>
          <input type="email" class="input form-control" [class.is-invalid]="email.invalid && email.dirty"
                 formControlName="email" required autocomplete="off">


          <div *ngIf="email.invalid && email.dirty" class="notification is-invalid">
            Your email doesn't look quite right...
          </div>

          <label for="password">Password</label>
          <input type="password" class="input form-control" [class.is-invalid]="password.invalid && password.touched"
                 formControlName="password" required>

          <div *ngIf="password.invalid && password.touched" class="notification is-invalid">
            Password must be between 6 and 24 chars and have at least one number
          </div>

          <div *ngIf="signupForm.valid" class="notification is-valid">Form looks good! Let's do this.</div>
        </div>


        <button type="submit" class="button is-primary" [disabled]="!signupForm.valid">Submit</button>


      </form>



      <form [formGroup]="detailForm" *ngIf="user.uid && !user.username" (ngSubmit)="setAccountDetails(user)">

        <h3>Set your Account Details</h3>
        
        <div class="form-group">
          <label for="username">Username</label><br>
          <input type="text" formControlName="username" required autocomplete="off" class="form-control input"
                 [class.is-invalid]="username.invalid && username.dirty"
                 [class.is-valid]="username.valid && username.dirty"><br>


          <div *ngIf="username.invalid && username.dirty"  class="notification invalid-feedback">
            <strong>{{ username.value }}</strong> is already taken
          </div>

          <div *ngIf="username.valid" class="notification valid-feedback" >
            <strong>{{ username.value }}</strong> is available
          </div>

          <div *ngIf="username.pending" class="notification info-feedback">
            Hold tight... Checking availability of <strong>{{ username.value }}</strong>
          </div>

          <label for="fullname">Full Name</label><br>
          <input type="text" formControlName="fullname" class="form-control input" required><br>
          
        </div>





        <!--<button type="submit" class="button sig-button is-success" [disabled]="!detailForm.valid">Submit</button>-->

        <button class="NavbarLink LabelOnly isSignUp sig-button is-success"
        [ngClass]="{ 'is-invalid' : !detailForm.valid}"
        type="submit"
        [disabled]="!detailForm.valid"><span class="">Create Account</span>
        </button>
      </form>

      <p *ngIf="user.username" class="text-success">
        You have completed the form!
      </p>
    </ng-container>
      `,
  styles: [`
    @media (min-width: 40em) {
      .sig-button.isSignUp {
        height: 2.5rem;
        line-height: 2.5rem;
      }
    }
    
    .sig-button-text {
      position: relative;
      display: inline-block;
      color: rgb(255, 255, 255);
    }

    .sig-button {
      height: 2.5rem;
      min-width: 10rem;
      text-align: center;
      padding-right: 0.625rem;
      padding-left: 0.625rem;
      line-height: 2.5rem;
      color: rgb(255, 255, 255);
      background-color: #75FA8C;
      border: 1px solid #75FA8C;
      display: inline-block;
      font-size: 0.875rem;
      border-radius: 0.3125rem;
      border-image: initial;
      transition: background-color 0.2s, border-color 0.2s, color 0.2s;
    }
    
    button.is-invalid, button.is-invalid:hover {
      color: #D9D9E3;
      background-color: #FAFAFA;
      border-color: #FAFAFA;
      cursor: not-allowed;
    }

    button.is-invalid:hover {
      opacity: .5;
    }
    .sig-button:hover {
      background-color: #242424;
      border-color: #242424;
    }
    .sig-links>* {
      margin-left: .9375rem;
      cursor: pointer;
    }
  `]
  // styleUrls: ['../../../styles/_base.scss']
})
export class AccountFormComponent implements OnInit {

  // loginForm: FormGroup;


  signupForm: FormGroup;
  detailForm: FormGroup;

  userState;

  constructor(private afs: AngularFirestore, private fb: FormBuilder, public auth: AuthService) { }

  // ngOnInit() {
  //   this.loginForm = this.fb.group({
  //     email:  ['', [
  //       Validators.required,
  //       Validators.email
  //     ]],
  //     username:  ['',
  //       Validators.required,
  //       CustomValidator.username(this.afs)
  //     ],
  //   });
  //
  // }

  ngOnInit() {

    this.userState = this.auth.user.map(user => {
      if (user) {
        return user.username ? 'complete' : 'incomplete';
      }
    })

    // First Step
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
      ],
      'region': ['', [
      ]
      ],
    });

    // Second Step
    this.detailForm = this.fb.group({
      username:  ['',
        Validators.required,
        CustomValidator.username(this.afs)
      ],
      fullname:  ['',
        Validators.required
      ],
    });

  }




  // Use getters for cleaner HTML code
  // get email() {
  //   return this.loginForm.get('email')
  // }
  //
  // get username() {
  //   return this.loginForm.get('username')
  // }



  // Using getters will make your code look pretty
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }

  get username() { return this.detailForm.get('username') }
  get fullname() { return this.detailForm.get('fullname') }



  // Step 1
  signup() {
    return this.auth.emailSignUp(this.email.value, this.password.value)
  }

  // Step 2
  setAccountDetails(user) {
    return this.auth.updateUser(user, { username:  this.username.value,  displayName:  this.fullname.value  })
  }
}


// interface Validator<T extends FormControl> {
//   (c:T): {[error: string]:any};
// }

export class CustomValidator {
  static username(afs: AngularFirestore) {
    return (control: AbstractControl) => {

      const username = control.value.toLowerCase();

      return afs.collection('accounts', ref => ref.where('username', '==', username) )

        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length ? { usernameAvailable: false } : null ),
        )
    }
  }

}
