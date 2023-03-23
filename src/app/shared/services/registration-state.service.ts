import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegistrationStateService {
  private registrations = new BehaviorSubject<any>(null);
  private deleteRegistration = new Subject();
  private searchRegistration = new BehaviorSubject<any>(null);
  private currentRegistration = new BehaviorSubject<string>('');
  private currentRegistrationId = 0;

  constructor() { }

  setRegsitrationsState(data: any){
    this.registrations.next(data);
  }

  getRegistrationsState(){
    return this.registrations.asObservable();
  }
    
  getDeleteRegistration(){
    return this.deleteRegistration.asObservable();
  }

  setDeleteRegistrationState(data :any){
    this.deleteRegistration.next(data);
  }

  getSearchMasertData(){
    return this.searchRegistration.asObservable();
  }

  setSearchRegistration(data: any){
    this.searchRegistration.next(data);
  }

  setEditedRegistrationState(data:any) {
    this.currentRegistration.next(data);
  }

  getEditedRegistrationState() {
    return this.currentRegistration.asObservable();
  }

  setRegistrationID(data: number){
    this.currentRegistrationId = data;
  }

  getRegistrationId(){
    return this.currentRegistrationId;
  }
}
