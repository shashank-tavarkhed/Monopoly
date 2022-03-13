import { Component, Input, OnInit ,Inject} from '@angular/core';
import { FirestoreService } from 'src/app/firestore.service';
import { GameChangesService } from 'src/app/game-changes.service';
import { PlacesConstantService } from 'src/app/places-constant.service';
import {MatDialog,MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PlayersDataService } from 'src/app/players-data.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  gameData: any;
  @Input() gameID: any;
  playerTurn =0;
  playerID = localStorage.getItem('playerID') || 0;

  boardCards:any=[];
  currentPlay:any=[0,0];
  myTurn = false;
  src:any=['',''];

  me: any;
  currentCard:any ={};

  constructor(private _places:PlacesConstantService, private gc: GameChangesService,
     private fb: FirestoreService,public dialog: MatDialog, private playersData: PlayersDataService) {
  }

  ngOnInit(): void {
    this.gc.watchData(this.gameID).subscribe((resp: any) => {
      this.gameData = resp;
      this.getMyDoc(resp);
      this.checkForTurn();
      this.plotPlayers(this.gameData.players);
      this.mapLocations();
      this.currentPlay = this.me.prevDice;
      this.src = [`assets/dice/${this.currentPlay[0]}.png`,`assets/dice/${(this.currentPlay[1])}.png`];
    })
    this.boardCards = this.playersData.boardCardsSer;

    // this.playersData.boardCardsSub.subscribe(val => {
    //   console.log('xyzzz',val);

    //   this.boardCards= val;
    // })

  }

  async onRoll(){
    let prevdice = this.currentPlay[0] + this.currentPlay[1];
    let dice1 = Math.floor(Math.random()*6)+1;
    let dice2 = 0;
    if(this.me.currentPos == this.me.nextPos){
      this.me.nextPos = (this.me.nextPos + (Math.floor(Math.random()*9)+3));
    };
    if(this.me.currentPos > this.me.nextPos) {
      this.me.bank.balance -= 150000;

      //changing cards upgradable property
      this.me.cards.forEach( (pc:any)=>{
        this.boardCards.forEach((bc:any)=>{
          if(pc.id === bc.id){
            bc.upgradable = true;
          }
        })
      })
      this.gameData.players.forEach((player:any)=>{
       if(player.index == this.me.index){
          player.cards.forEach((card:any)=>{
            card.upgradable = true;
          })
       }
      })

      this.playersData.boardCardsSer = this.boardCards;
      this.me.currentPos = this.me.currentPos - this.boardCards.length;
    }
    dice2 = Math.abs((this.me.nextPos- this.me.currentPos)) - dice1;

    if(dice2 >= 6 || dice1>(this.me.nextPos- this.me.currentPos)){
      dice1 += dice2 % 6;
      dice2 = Math.abs((this.me.nextPos- this.me.currentPos) - dice1);
    }
    if(dice2 == 0){
      dice1--;
      dice2++;
    }
    this.currentPlay = [dice1,dice2];
    this.src = [`assets/dice/${this.currentPlay[0]}.png`,`assets/dice/${(this.currentPlay[1])}.png`];

    this.me.currentPos = this.me.nextPos;
    this.me.nextPos = (this.me.nextPos + (Math.floor(Math.random()*6)+6)) % this.boardCards.length;

    //check if currpos is chest/chance
    this.checkpoints(prevdice);



    //flag the bankrupts
    this.flagBankrupts();


    // check for winner
    // this.checkWinner();

    //updating features component
    this.playersData.game =this.gameData;
    this.playersData.boardCardsSer = this.boardCards;

    this.me.prevDice = [this.currentPlay[0] , this.currentPlay[1]]

    this.gameData.turn = (this.gameData.turn + 1) % this.gameData.players.length;
    await this.fb.updateDocument(this.gameData, this.gameID);
  }

  checkpoints(prevdice:number){
    if( this.boardCards[this.me.currentPos].type == 'CHEST/CHANCE'){
      if(this.boardCards[this.me.currentPos].name == 'COMMUNITY CHEST'){
        if( prevdice % 2 == 0){
         this.me.bank.balance += prevdice * 50;
        } else{
         this.me.bank.balance -= prevdice * 50;
        }
      }
      if(this.boardCards[this.me.currentPos].name == 'CHANCE'){
       if( prevdice % 2 == 0){
        this.me.bank.balance -= prevdice * 50;
       } else{
        this.me.bank.balance += prevdice * 50;
       }
     }
    }
   //check if currpos is checkpoint
   if( this.boardCards[this.me.currentPos].type == 'CHECKPOINT'){
     if(this.boardCards[this.me.currentPos].name !=='START') {
       if( this.boardCards[this.me.currentPos].name =='REST HOUSE' ){
         this.me.bank.balance += 100;
       }else{
         this.me.bank.balance -=100;
       }
     }
   }
   //check if user's current position (but not owner) is owned by others then deduct rent
   if(this.boardCards[this.me.currentPos].bought == true && this.me.index !== this.boardCards[this.me.currentPos].owner){
     if(this.boardCards[this.me.currentPos].type =='CITY'){
       this.me.bank.balance -= this.boardCards[this.me.currentPos].upgrades[this.boardCards[this.me.currentPos].current_upgrade];

       this.gameData.players.forEach((el:any) =>{
         if(el.index == this.boardCards[this.me.currentPos].owner){
           el.bank.balance += this.boardCards[this.me.currentPos].upgrades[this.boardCards[this.me.currentPos].current_upgrade];
         }
       })
     }
     if(this.boardCards[this.me.currentPos].type =='BUSINESS'){
       this.me.bank.balance -= this.boardCards[this.me.currentPos].rent;

       this.gameData.players.forEach((el:any) =>{
         if(el.index == this.boardCards[this.me.currentPos].owner){
           el.bank.balance += this.boardCards[this.me.currentPos].rent;
         }
       })
     }

   }
  }

  flagBankrupts(){
    if(this.me.bank.balance < 0){
      alert('You are bankrupt.')
      this.gameData.players.forEach((player:any)=>{
        if(this.me.index == player.index){
          player.isBankrupt = true;
          player.bank.balance = 0;
          player.cards.forEach((pcard:any)=>{
            this.boardCards.forEach((bcard:any)=>{
              if(bcard.id == pcard.id){
                console.log(bcard);

                bcard.bought =false;
                bcard.current_upgrade = 0;
                bcard.owner = null;
                bcard.color = 'white'
              }
            })
          })
          player.cards = [];
        }
      })
      this.gameData.totalPlayers -= 1;
    }
  }

  checkWinner(){
    if(this.gameData.totalPlayers ===1){
      const winner = this.gameData.players.filter((player:any)=> player.isBankrupt ==false);
      alert(`Winner is ${winner.name}.`)
    }
  }

  plotPlayers(players: any){
    players.forEach((element: any) => {
      this.removePlayerDiceLocation(element.playerID);
      const player = document.createElement('div');
      player.className = "dice-place";
      player.className = "dice-place-"+element.playerID;
      player.style.backgroundColor = element.color; // append # for hex codes
      player.style.width = '10px';
      player.style.height = '10px;';
      player.style.borderRadius = '50%';
      player.style.marginRight = '4px';
      player.style.border ='1px solid black'
      document.querySelector('.dice-content-'+parseInt(element.currentPos))?.appendChild(player);
    });
  }

  removePlayerDiceLocation(playerID: string){
    document.querySelector('.dice-place-'+playerID)?.remove()
  }

  getMyDoc(resp: any){
    const me = resp.players.filter((e: any) => e.playerID == this.playerID);
    if(me.length != 0){
      this.playersData.updateData(me[0], 'player');
      this.playersData.updateData(this.gameData, 'game');
      return this.me = me[0];
    }
  }

  mapLocations(){
    this.gameData.players.forEach((player: any) => {
      player.cards.forEach((card: any) => {
        this.boardCards[card.id].bought = true;
        this.boardCards[card.id].color = player.color;
        this.boardCards[card.id].owner = player.index;
      });
    });
  }

  onBuy(data:any){
    if(this.me.bank.balance >= data.price){
      this.boardCards.forEach(async (el:any,i:number)=>{
        if(el.name == data.name){
          el.bought= true;
          el.owner = this.me.index;
          el.color = this.me.color;
          el.upgradable = false;
          this.me.bank.balance -= data.price;

          this.me.cards.push(data);

          //updating user data to service
          this.playersData.currentPlayer = this.me;
          this.playersData.boardCardsSer = this.boardCards;
          await this.fb.updateDocument(this.gameData, this.gameID);
        }
      })
    }
  }

  checkForTurn(){
      this.playerTurn = this.gameData.turn;
      this.myTurn = this.me.index == this.gameData.turn;

  }


  openDialog(item:any): void {
    const dialogRef = this.dialog.open(DialogOverview, {
      width: 'fit content',
      height: 'fit content',
      data: item,
    });

    dialogRef.afterClosed().subscribe(result => {
      if( result){
        this.currentCard = result
        this.onBuy(result);
      }
    });

  }

}

@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.html',
  styleUrls: ['dialog.scss']
})

export class DialogOverview{
  constructor(
    public dialogRef: MatDialogRef<DialogOverview>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  toBuy(data:any): void {
    this.dialogRef.close(data[0]);
  }
}









/* bankruptcy flags in feature ✅✅✅

---winner check == lastplayer standing ✅✅✅

roll mechanism

0 roll dice ✅✅✅

upgradesystem ✅✅✅

REMOVE upgradeable from investments html ✅✅✅

disable roll for bankrupt's turn

upgrading rent details and bankrupts details on every player screen


*/
