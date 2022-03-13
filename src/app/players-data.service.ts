import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject  } from 'rxjs';
import { startWith} from 'rxjs/operators'
import { PlacesConstantService } from './places-constant.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersDataService {
  currentPlayer:object={};
  game:any ={};
  boardCardsSer:any =[];
  update = new Subject();
  constructor(private _places: PlacesConstantService) {
    this.boardCardsSer = this._places.places.map(el => el);
  }

  updateData(data: any, type: string){
    if(type == 'game'){
      this.game = data;
    }else{
      this.currentPlayer = data;
    }
    return this.update.next('updated')
  }

}

