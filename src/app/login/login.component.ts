import { JoinGameComponent } from './../components/join-game/join-game.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from 'app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthGuard } from 'app/services/auth.guard';
import { LeaderboardComponent } from 'app/components/leaderboard/leaderboard.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: AuthService, private dataservice: DataService, public dialog: MatDialog, private authGuard: AuthGuard) { }

  ngOnInit() {
  }

}
