import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
import { PlayerComponent } from './player/rcvr-player'
import {AuthGuard} from '@sgnl/auth';
import {LoginComponent} from './login/login'
import {SettingsComponent} from './settings/settings'


export const routes: Routes = [
  { path: '', redirectTo: 'player', pathMatch: 'full' },
  {
    path: 'player',
    component: PlayerComponent,
    data: { animation: 'home' },
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { animation: 'home' },
  },
  { path: 'accounts/:id', component: PlayerComponent },
  { path: '**', redirectTo: 'player' },
]

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)
