import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Game, GameFirebase, GameClient, User } from './../../types';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  constructor(public db: AngularFirestore, public afAuth: AngularFireAuth, private router: Router) {

  }

  getGame(gameID: string): Observable <GameClient> {
    return this.db.collection('game').doc<GameFirebase>(gameID).valueChanges().pipe(
      map(this.convertToClient)
    );
  }

  newGame() {
    const key = this.db.createId();
    const newGame: GameFirebase = {
      board: '0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0',
      docID: key,
      player1: this.afAuth.auth.currentUser.uid,
      player2: null,
      playerTurn: this.afAuth.auth.currentUser.uid,
      winner: null
    };
    this.db.collection('game').doc(key).set(newGame);
    this.router.navigate(['/game/' + newGame.docID]);
  }

  joinExistingGame(code): Promise <string> {
    return new Promise ((res, rej) => {
      const docRef = this.db.collection('game').doc<GameFirebase>(code);

      docRef.get().toPromise().then(doc => {
        if (doc.exists) {
          if (doc.data().player2) {
            rej('The game is already full!');
          } else {
            this.db.collection('game').doc(code).update({
              player2: this.afAuth.auth.currentUser.uid
            });
            res();
          }
        } else {
          rej('Game does not exist! Enter a new code.');
        }
        }).catch(error => {
          rej('Couldnt access firebase game!');
      });
    });
  }

  private convertToClient(game: GameFirebase): GameClient {
    const boardArray: number[][] = [[], [], [], [], [], [], []];
    const stringifiedBoard = game.board;
    const boardStringArrray = stringifiedBoard.split(',');

    for (let col = 0; col < 7; col++) {
      for (let row = 0; row < 6; row++) {
        boardArray[col].push(parseInt(boardStringArrray[6 * col + row], 10));
      }
    }

    const newGame: Game = game;
    newGame.board = boardArray;
    return newGame as GameClient;
  }

  public updateGameState(game: GameClient) {
    const newGame = this.convertToFirebase(game);
    newGame.playerTurn = (newGame.playerTurn === game.player1) ? game.player2 : game.player1;
    this.db.collection('game').doc(game.docID).update(game);
  }

  private convertToFirebase(game: GameClient): GameFirebase {
    const stringifiedGameBoard = game.board.map( col => {
      return col.join(',');
    }).join(',');

    const newGame: Game = game;
    newGame.board = stringifiedGameBoard;
    return newGame as GameFirebase;
  }

  addWin() {

  }

  leaderboard(): Observable <User[]> {
    return this.db.collection<User>('users', ref => ref.orderBy('wins', 'desc').limit(10)).valueChanges();
  }

  getUsers(userID): Observable <User> {
    return this.db.collection('users').doc<any>(userID).valueChanges();
  }
}
