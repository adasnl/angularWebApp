import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegistrationServiceService } from 'src/app/api-service/registration-service.service';
import { RegistrationActionService } from '../../services/registration-action.service';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.scss']
})
export class EditRegistrationComponent implements OnInit{
  registrationForm!: UntypedFormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private registrationServiceService: RegistrationServiceService,
    private registrationActionService: RegistrationActionService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.buildForm();

    this.registrationActionService.getEditedRegistrationState().subscribe((result: any)=>{
      console.log(result);
      this.registrationForm?.setValue({name: result.name,
        email: result.email, phoneNumber: result.phoneNumber, city: result.city, pincode: result.pinCode, id: result.id });
        this.registrationActionService.setRegistrationID(result.id);
    });
  }

  buildForm() {
    this.registrationForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      city: [null, [Validators.required]],
      pincode: [null, [Validators.required]],
      id: [this.registrationActionService.getRegistrationId()]
    });
  }

  cancelRegistration(){
    this.router.navigateByUrl(`/`);
  }

  saveRegistration(){
    console.log(this.registrationForm.value);

    this.registrationServiceService.updateRegistration(this.registrationForm.value).subscribe({
      next:(result: any) =>{
        if(result){
          this.toastr.success('Registration updated successfully!');
          this.close();

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

  close() {
    this.registrationActionService.getRegistrations();
    this.dialog.closeAll();
  }
}
