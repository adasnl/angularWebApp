import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationServiceService } from '../api-service/registration-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-registration',
  templateUrl: './add-registration.component.html',
  styleUrls: ['./add-registration.component.scss']
})

export class AddRegistrationComponent implements OnInit{
  registrationForm!: UntypedFormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private registrationServiceService: RegistrationServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      city: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
    });
  }

  cancelRegistration(){
    this.router.navigateByUrl(`/`);
  }

  saveRegistration(){
    console.log(this.registrationForm.value);

    this.registrationServiceService.createRegistration(this.registrationForm.value).subscribe({
      next:(result: any) =>{
        if(result){
          this.toastr.success('Registration successful!');
          this.router.navigateByUrl(`/`);
        }
        else{
          this.toastr.error('Something went wrong!');
        }
      },
      error(err){
        console.error('Something wrong occurred: ' + JSON.stringify(err));
      },
    });
  }
}
