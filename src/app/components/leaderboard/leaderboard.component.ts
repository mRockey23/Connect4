import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'app/services/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  users: Observable <User[]>;

  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<LeaderboardComponent>, public dataService: DataService, public snackbar: MatSnackBar, private router: Router) {

  }

  ngOnInit() {
    this.users = this.dataService.leaderboard();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
