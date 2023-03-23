import { Injectable } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { RegistrationServiceService } from 'src/app/api-service/registration-service.service';
import { RegistrationStateService } from './registration-state.service';

@Injectable({
  providedIn: 'root'
})

export class RegistrationActionService extends RegistrationStateService {

  constructor(public registrationApi: RegistrationServiceService, private toastr: ToastrService) { 
    super();
  }

  getRegistrations(){
    this.registrationApi.getRegistrations().subscribe({
      next: (result: any) =>{
        this.setRegsitrationsState(new MatTableDataSource(result));
      },
      error(err) {
        console.error('Something wrong occurred: ' + JSON.stringify(err));
      },
    });
  }

  searchRegistrations(searchkey: any){
    if(searchkey === "")
      searchkey = " ";
    this.registrationApi.serachRegistration(searchkey).subscribe({
      next:(result: any) =>{
        this.setRegsitrationsState(new MatTableDataSource(result));
      },
      error(err){
        console.error('Something wrong occurred: ' + JSON.stringify(err));
      },
    });
  }

  addRegistration(data: any){
    this.registrationApi.createRegistration(data).subscribe({
      next:(result: any) =>{
        
      },
      error(err){
        console.error('Something wrong occurred: ' + JSON.stringify(err));
      },
    });
  }

  updateRegistration(data: any){
    this.registrationApi.updateRegistration(data).subscribe({
      next:(result: any) =>{
      },
      error(err){
        console.error('Something wrong occurred: ' + JSON.stringify(err));
      },
    });
  }

  deleteRegistrations(data: number){
    this.registrationApi.deleteRegistration(data).subscribe({
      next:(result: any) =>{
        if(result){
          this.toastr.success('Registration deleted successfully!');
          this.getRegistrations();
        }
        else{
          this.toastr.error('Registration deletion unseccessful!');
        }
      },
      error(err){
        console.error('Something wrong occurred: ' + JSON.stringify(err));
      },
    });
  }

  getRegistrationById(data: any){
    if(data){
      this.registrationApi.getRegistrationsById(data).subscribe({
        next:(result: any)=> {
          this.setEditedRegistrationState(result);
        },
        error(err){
          console.error('Something wrong occurred: ' + JSON.stringify(err));
        }
      });
    }
  }
}
