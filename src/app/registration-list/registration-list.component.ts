import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RegistrationServiceService } from '../api-service/registration-service.service';
import { Observable } from 'rxjs';
import { RegistrationActionService } from '../shared/services/registration-action.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})

export class RegistrationListComponent {
  readonly dataSource: Observable<any> = this.registrationActionService.getRegistrationsState();
  dataSourceWithPageSize: any = [];

  @ViewChild('editRegistration', { static: true })
  editRegistration!: TemplateRef<any>;

  displayedColumns: string[] = ['name', 'email', 'phone', 'city', "pincode", "position"];
  
  constructor(
    private router: Router,
    private registrationActionService: RegistrationActionService,
    public dialog: MatDialog
  ) { }

  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;

  @ViewChild('messageDialog', { static: true }) 
  messageDialog!: TemplateRef<any>;

  pageSizes = [5, 10, 15];

  ngAfterViewInit() {
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  ngOnInit(): void {
    this.dataSource.subscribe((result) => {
      if(result){
        result.paginator = this.paginatorPageSize;
        this.dataSourceWithPageSize = result;
      }
    });
    this.registrationActionService.getRegistrations();
  }

  searchRegistration (value: any){
    this.registrationActionService.searchRegistrations(value);
  }

  deleteEntry(id: number){
    this.registrationActionService.deleteRegistrations(id);
  }

  editConfig(element: any){
    this.registrationActionService.setEditedRegistrationState(element);
    this.dialog.open(this.editRegistration);
  }

  close() {
    this.dialog.closeAll();
  }

  addRegistrationNavigation(){
    this.router.navigateByUrl(`/add`);
  }
}
