import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Firebase stuff
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { GameboardComponent } from './gameboard/gameboard.component';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from './navbar/navbar.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';


@NgModule({
  declarations: [
    AppComponent,
    GameboardComponent,
    LoginComponent,
    NavbarComponent,
    JoinGameComponent,
    LandingComponent,
    LeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'LastRowSquad'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ JoinGameComponent, LeaderboardComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
