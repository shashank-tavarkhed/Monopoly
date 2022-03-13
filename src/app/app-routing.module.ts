import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { InitComponent } from './init/init.component';
import { RoomComponent } from './room/room.component';

const routes: Routes = [
  {path: '', redirectTo: 'init', pathMatch:'full'},
  {path: 'init', component:InitComponent},
  {path: 'room/:gameID', component:RoomComponent},
  {path: 'game/:gameID', component:GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
