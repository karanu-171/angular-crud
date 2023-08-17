import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData
} from "@angular/fire/firestore";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud operation';
  userData: Observable<any>;

  constructor (private firestore: Firestore) {
    this.getData()
   }

  addData(f: any){
    const collectionInstance = collection(this.firestore, 'users')
    addDoc(collectionInstance, f.value).then(() =>{
      console.log("Data saved sucessfully")
    })
    .catch((error) =>{
      console.log(error)
    })
  }
  
  getData() {
    const collectionInstance = collection(this.firestore, 'users')
    collectionData(collectionInstance)
    .subscribe(val => {
      console.log(val)
    })

    this.userData = collectionData(collectionInstance)
  }
}
