import { Component } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  updateDoc,
  deleteDoc
} from "@angular/fire/firestore";
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud operation';
  userData: Observable<any[]>;

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
    collectionData(collectionInstance, {idField: 'id'})
    .subscribe(val => {
      console.log(val)
    })

    this.userData = collectionData(collectionInstance, {idField: 'id'})
  }

  updateData(id: string) {
    const docInstance = doc(this.firestore, 'users', id)
    const updatedData = {
      userName: 'updatedName'
    }
    updateDoc(docInstance, updatedData).then(() => {
      console.log('Data saved')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id)
    deleteDoc(docInstance).then(()=> {
      console.log('Data deleted successfully')
    })
    .catch((err)=>{
      console.log(err)
    })
  }
}
