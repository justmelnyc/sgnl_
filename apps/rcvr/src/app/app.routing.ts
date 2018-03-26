import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { PlayerComponent } from './player/rcvr-player'
import {AuthGuard} from '@sgnl/auth';
import {LoginComponent} from './login/login'
import {SettingsComponent} from './settings/settings'


export const routes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'player',
    component: PlayerComponent,
    // canActivate: [AuthGuard],
    data: { animation: 'home' },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { animation: 'home' },
  },
  { path: 'accounts/:id', component: PlayerComponent },
  { path: '**', redirectTo: 'player' },
]

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)
