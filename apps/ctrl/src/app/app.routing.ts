import { Routes, RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core'
// import { AdminComponent } from './admin/admin.component'
import { PlayerComponent } from './player/player'
import {AuthGuard} from "@sgnl/auth";
import {LoginComponent} from "./login/login";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'player',
    component: PlayerComponent,
    canActivate: [AuthGuard],
    data: { animation: 'home' },
  },
  { path: 'accounts/:id', component: PlayerComponent },
  { path: '**', redirectTo: 'player' },
]

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(routes)
