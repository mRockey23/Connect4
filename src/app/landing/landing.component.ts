import { LeaderboardComponent } from './../components/leaderboard/leaderboard.component';
import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'app/services/auth.guard';
import { Router } from '@angular/router';
import { DataService } from 'app/services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { JoinGameComponent } from './../components/join-game/join-game.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private router: Router, private dataservice: DataService, public dialog: MatDialog, public auth: AuthService) {
  }

  ngOnInit() {
  }

  newGame() {
    this.dataservice.newGame();
  }

  openModal() {
    const dialogRef = this.dialog.open(JoinGameComponent, {
      height: '200px',
      width: '600px',
    });
  }

  openLeaderboardModal() {
    const dialogRef = this.dialog.open(LeaderboardComponent, {
      width: '700px',
    });
  }

}
