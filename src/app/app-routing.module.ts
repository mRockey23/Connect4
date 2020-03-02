import { GameboardComponent } from './gameboard/gameboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ActivatedRoute } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'game/:gameID', component: GameboardComponent, canActivate: [AuthGuard] },
  { path: 'leaderboard', component: LeaderboardComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
