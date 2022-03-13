import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InitComponent } from './init/init.component';
import { GameComponent } from './game/game.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RoomComponent } from './room/room.component';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { FirestoreService } from './firestore.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { BoardComponent } from './game/board/board.component';
import { FeaturesComponent } from './game/features/features.component';
import { DialogOverview } from './game/board/board.component';


@NgModule({
  declarations: [
    AppComponent,
    InitComponent,
    GameComponent,
    LeaderboardComponent,
    RoomComponent,
    BoardComponent,
    FeaturesComponent,
    DialogOverview,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,MatButtonModule, FormsModule,
    MatSnackBarModule,MatDialogModule, MatCardModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFirestoreModule,
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
