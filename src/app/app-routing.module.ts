import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { EditRegistrationComponent } from './shared/component/edit-registration/edit-registration.component';
import { RegistrationListComponent } from './registration-list/registration-list.component';

const routes: Routes = [
  { path: '', component: RegistrationListComponent },
  { path: 'add', component: AddRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
