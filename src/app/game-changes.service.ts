import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class GameChangesService {
  constructor(private fb: FirestoreService) { }

  watchData(id:any){
    return this.fb.watch(id);
  }
}
