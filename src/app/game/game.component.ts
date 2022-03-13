import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { FirestoreService } from '../firestore.service';
import { PlacesConstantService } from '../places-constant.service';

interface CardPros{
  name: string,
  type: string,
  buyValue: number,
  upgrades: [],
  finalUpgrade: number,
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  cards: any=[];
  names =['Avenue' , 'Place', 'Gardens'];
  types = ['x','y','z'];

  gameData = new Subject();

  cardBlocks: any = [];
  url: any;
  game: any;
  playerID: any;
  user: any;


  constructor(private _places: PlacesConstantService, private fb: FirestoreService, private router: Router, private route: ActivatedRoute) {

  }


  randomSelector(arr:any){
    const choice = Math.floor(Math.random() * arr.length);
    return arr[choice];
  }

  generateCards(){
    for(let i =1; i<41; i++){
       let newObj:any ={}

      //add data
        newObj.name = this.randomSelector(this.names);
        newObj.type = this.randomSelector(this.types)

      //push to arr
       this.cards.push(newObj);
    }
  }
  ngOnInit(): void {
    this.generateCards();
    this.route.paramMap.subscribe((params:any) => {
      this.url = params.get('gameID');
    });
  }



}
