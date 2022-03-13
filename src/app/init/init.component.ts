import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { PlayersDataService } from '../players-data.service';

interface User{
  name: string,
  color: string
  currentPos: number,
  cards: [],
  playerID: string
}

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.scss']
})
export class InitComponent implements OnInit {
  name: string = '';

  user: any= {
    name: this.name,
    color: this.generateColor(),
    currentPos: 0,
    cards: [],
    playerID: 'p-'+ (Math.floor(Math.random() * 100) + 1),
    bank: {
      balance: 15000,
    },
    nextPos: 0,
    index: 0,
    isBankrupt:false,
    prevDice: [],
  }

  game = {
    players: [this.user],
    gameID: this.generateGameID(),
    started: false,
    turn: 0,
    totalPlayers:0,
  }
  constructor(private router: Router, private _snackBar: MatSnackBar,
     private fb: FirestoreService,private playerData: PlayersDataService) { }

  ngOnInit(): void {
  }

  async submit(){
    if(this.user.name.length > 0){
      const a = await this.fb.addToCollection(this.game);
      localStorage.setItem('playerID', this.user.playerID);
      this.router.navigateByUrl(`room/${a.id}`);
      this.playerData.currentPlayer = this.user;
      this.game.totalPlayers ++;
      this.playerData.game = this.game;
    }else{
      this._snackBar.open('Please enter valid name', 'Okay', {
        horizontalPosition: 'end',
        verticalPosition: 'bottom',
        duration: 3000,
      });
    }
  }

  generateColor(){
    const arr = ['red', 'green', 'blue', 'purple', 'indigo', 'orange', 'yellow', 'brown', 'black'];
    let randomCode = 0;
    return arr[randomCode];
  }

  generateGameID(){
    return Math.floor(Math.random() * 1000) + 1;
  }

}
