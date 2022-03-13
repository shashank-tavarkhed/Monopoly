import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { PlayersDataService } from '../players-data.service';


interface User{
  name: any,
  color: string
  currentPos: number,
  cards: [],
  playerID: string,
  index: number
}

export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  url: any;
  user: any= {
    name: '',
    color: '',
    currentPos: 0,
    cards: [],
    playerID: 'p-'+ (Math.floor(Math.random() * 100) + 1),
    index: 1,
    nextPos: 0,
    bank: {
      balance: 15000,
    },
    isBankrupt:false,
    prevDice: [],
  }

  game:any = {
    gameID: 0,
    players: [],
  };

  playerID = localStorage.getItem('playerID') || 0;


  constructor(private route: ActivatedRoute,
     private fb: FirestoreService,
      private dialog: MatDialog,
       private router: Router,
       private playersData:PlayersDataService,
       ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.url = params.get('gameID');
      this.fb.watch(this.url).subscribe(
        async (resp) => {
          this.game = resp;
          const me = resp.players.filter((e: any) => e.playerID == this.playerID);
          if(me.length == 0){
            let name = prompt('Please enter your name');
            if(name && name?.length > 0){
              this.user.name = name;
              localStorage.setItem('playerID', this.user.playerID);
              this.playerID = this.user.playerID;
              this.user.index = resp.players.length;
              this.game.players.push(this.user);
              this.playersData.currentPlayer = this.user;
              this.playersData.game = this.game;
              this.user.color = this.generateColor();
              this.game.totalPlayers = this.game.players.length;
              console.log('room', this.game);
              const a = await this.fb.updateDocument(this.game, this.url);
            }
          }else if(this.game.started){
            this.router.navigateByUrl('game/'+this.url)
          }
        }
      )
    });
  }


  generateColor(){
    const arr = ['red', 'green', 'blue', 'purple', 'indigo', 'orange', 'yellow', 'brown', 'black'];
    let randomCode =this.playersData.game.players.length -1;
    console.log('game ser',this.playersData.game);
    return arr[randomCode];
  }

  async startGame(){
    this.game.started = true;
    await this.fb.updateDocument(this.game, this.url);
    this.router.navigateByUrl('game/'+this.url);
  }



}
