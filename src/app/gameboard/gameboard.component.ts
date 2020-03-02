import { browser } from 'protractor';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GameClient } from '../../types';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../services/data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthGuard } from 'app/services/auth.guard';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css']
})
export class GameboardComponent implements OnInit, OnDestroy {

  game: GameClient;
  playerTurn = false;
  myColor: number;
  gameID: string;
  gameSubscription: Subscription;

  // tslint:disable-next-line: max-line-length
  constructor(public dataService: DataService, public activatedRoute: ActivatedRoute, public afauth: AngularFireAuth, private authGuard: AuthGuard, public router: Router) {
  }

  ngOnInit() {
    this.gameID = this.activatedRoute.snapshot.paramMap.get('gameID');
    this.gameSubscription = this.dataService.getGame(this.gameID).subscribe((game) => {
      this.game = game;
      this.myColor = this.afauth.auth.currentUser.uid === this.game.player1 ? 1 : 2;
      this.playerTurn = this.afauth.auth.currentUser.uid === this.game.playerTurn;
    });
  }

  ngOnDestroy() {
    this.gameSubscription.unsubscribe();
  }

  placePiece(column) {
    const board = this.game.board;
    const colArray = board[column];
    let flag = false;
    let row;

    for (let x = 5; x >= 0; x--) {
      if (colArray[x] === 0) {
        row = x;
        if (this.myColor === 2) {
          colArray[x] = 2;
          flag = true;
          break;
        }

        colArray[x] = 1;
        flag = true;
        break;
      }
    }

    if (!flag) {
      console.log('Error case!');
      return;
    }

    this.checkVertical(colArray);
    this.checkHorizontal(board, row);
    this.checkForwardSlash(board, row, column);
    this.checkBackwardSlash(board, row, column);


    const updateGame = this.game;
    updateGame.board = board;
    this.dataService.updateGameState(JSON.parse(JSON.stringify(updateGame)));
  }

  checkForwardSlash(array, row, col) {
    let count = 0;

    // check up
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col + x][row - x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal [bottom left] right win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }

    // check up [middle]
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col - 1 + x][row + 1 - x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal [middle left] right win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }

    // check down
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col - x][row + x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal [top right] right win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }

    // check down [middle]
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col + 1 - x][row - 1 + x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal [middle right] right win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }
  }

  checkBackwardSlash(array, row, col) {
    let count = 0;

    // check up
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col - x][row - x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal left win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }

    // check up [middle]
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col + 1 - x][row + 1 - x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal [middle right] left win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }

    // check down
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col + x][row + x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal left win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }

    // check down [middle]
    for (let x = 0; x <= 3; x++) {

      try {
        if (array[col - 1 + x][row - 1 + x] === this.myColor) {
          count++;
        } else {
          count = 0;
          break;
        }

        if (count === 4) {
          console.log(this.myColor + ' is the winner!');
          console.log('Diagonal [middle left] left win!');
          this.game.winner = this.afauth.auth.currentUser.uid;
        }

      } catch (error) {
        count = 0;
        break;
      }

    }
  }

  checkVertical(array) {
    let count = 0;

    for (let x = 5; x >= 0; x--) {

      if (array[x] === this.myColor) {
        count++;
      } else {
        count = 0;
      }

      if (count === 4) {
        console.log(this.myColor + ' is the winner!');
        console.log('Vertical win!');
        this.game.winner = this.afauth.auth.currentUser.uid;
      }

    }
  }

  checkHorizontal(board, rowNum) {
    let count = 0;

    for (let x = 6; x >= 0; x--) {
      if (board[x][rowNum] === this.myColor) {
        count++;
      } else {
        count = 0;
      }

      if (count === 4) {
        console.log(this.myColor + ' is the winner!');
        console.log('Hoizontal win!');
        this.game.winner = this.afauth.auth.currentUser.uid;
      }
    }

  }

  quitGame() {
    this.router.navigate(['/']);
  }
}
