import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  itemsCollection: AngularFirestoreCollection<any> | undefined;
  items: Observable<any[]> | undefined;

  itemDoc: AngularFirestoreDocument<any> | undefined;
  item: Observable<any> | undefined;
  constructor(private afs: AngularFirestore) {
  }

  watch(id: any){
    this.itemDoc = this.afs.doc<any>('game/'+id);
    this.item = this.itemDoc.valueChanges();
    return this.item
  }
  

  addToCollection(obj: any){
    this.itemsCollection = this.afs.collection<any>('game');
    return this.itemsCollection?.add(obj);
  }

  updateDocument(obj: any, docID: any){
    return this.afs.collection<any>('game').doc(docID).update(obj);
  }

  
}
