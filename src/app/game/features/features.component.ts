import { Component, OnInit } from '@angular/core';
import { PlayersDataService } from 'src/app/players-data.service';


@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})

export class FeaturesComponent implements OnInit {
  user:any ={};
  players:any=[];
  cards:any=[];
  constructor(private playerData:PlayersDataService) {
    this.user=this.playerData.currentPlayer;
    this.players=this.playerData.game.players;
    // this.cards = this.playerData.boardCardsSer;

  }

  ngOnInit(): void {
    this.playerData.update.subscribe((resp: any) => {
      this.user=this.playerData.currentPlayer;
      this.players=this.playerData.game.players;
      this.cards = this.playerData.boardCardsSer;
      // this.playerData.boardCardsSub.subscribe(cards=>{
      //   this.cards = cards;
      // })
    })
  }
  onClick(){
    console.log(this.cards);
  }

  upgrade(card: any){
    if(this.user.bank.balance > card.houseCost){
      console.log('upgrading');

      this.players.forEach((player: any)=>{
        if(player.index === card.owner){
          console.log(player.name);
          player.cards.forEach((el:any)=>{
            if(card.id==el.id){
              console.log(el);
              el.current_upgrade +=1
              el.upgradable = false;
              console.log(el.current_upgrade);
            }
          })
          player.bank.balance -= card.houseCost;
          this.user = player;
        }
      })

      this.playerData.game.players = this.players
      this.cards.forEach((el:any)=>{
        if (el.id === card.id){
          el.current_upgrade +=1;
          el.upgradable = false;
          console.log(el.name, 'upgraded', el.current_upgrade);
        }
      })
      console.log(this.cards);

      // this.playerData.boardCardsSub.next(this.cards);

      this.playerData.boardCardsSer = this.cards

    } else{
      alert("You dont have enough funds!")
    }
  }
}
