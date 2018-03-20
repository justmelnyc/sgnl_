import {NgModule, Provider} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {FirestoreService} from '@sgnl/fire';
import {AuthGuard} from './services/guard';
import {NotifyService} from './services/notify';
import {AuthService} from './services/auth';
import {AccountCreateComponent} from './components/account-create';
import {AccountFormComponent} from './components/account-form';
import {AccountLoginComponent} from './components/account-login';


export function authModules() {
  return [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ];
}

export function authComponents() {
  return [AccountCreateComponent, AccountFormComponent, AccountLoginComponent];
}

export function authServices(): Provider[] {
  return [FirestoreService, AngularFirestore, NotifyService, AuthService, AuthGuard];
}

@NgModule({
  imports: authModules(),
  declarations: authComponents(),
  exports: authComponents(),
  providers: authServices()
})
export class AuthModule {}
