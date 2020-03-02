import { Router } from '@angular/router';
import { DataService } from 'app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.css']
})
export class JoinGameComponent implements OnInit {

  code: string;

  // tslint:disable-next-line: max-line-length
  constructor(public dialogRef: MatDialogRef<JoinGameComponent>, public dataService: DataService, public snackbar: MatSnackBar, private router: Router) {

  }

  ngOnInit() {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  joinGame() {
    this.dataService.joinExistingGame(this.code).then(() => {
      this.dialogRef.close();
      this.router.navigate(['/game/' + this.code]);
    }).catch((errorMessage) => {
      this.snackbar.open('Invalid code! Try again.', null, {
        duration: 4000
      });
      this.code = '';
    });

  }

}
