import { Game } from './types';

export interface Game {

    board: number[][] | string;
    player1: string;
    player2: string;
    playerTurn: string;
    docID: string;
    winner: string;

}

export interface GameFirebase extends Game {

    board: string;

}

export interface GameClient extends Game {

    board: number[][];

}

export interface User {

    uid: string;
    email: string;
    photoURL?: string;
    displayName?: string;

}
