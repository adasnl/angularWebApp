import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchRegistration } from '../models/search-registration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {
  roorUrl = "https://localhost:44381/Registration";
  searchRegistration: SearchRegistration = {searchKey: ""}
  constructor(private http: HttpClient) { }

  createRegistration(data: any){
    return this.http.post(this.roorUrl + '/Create', data);
  }

  getRegistrations(){
    return this.http.get<any[]>(this.roorUrl);
  }

  getRegistrationsById(data: any){
    return this.http.get<any[]>(this.roorUrl + '/Get/' + data);
  }

  serachRegistration(data: any){
    this.searchRegistration.searchKey = data;
    return this.http.post<any[]>(this.roorUrl + '/SearchRegistrations/', this.searchRegistration);
  }

  deleteRegistration(data: number){
    return this.http.delete(this.roorUrl + '/Delete/' + data);
  }

  updateRegistration(data: any){
    return this.http.put(this.roorUrl + '/Put', data);
  }
}