import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  constructor(private service: ApiserviceService) {}

  EmployeeList: any = [];
  ModalTitle = '';
  ActivateAddEditEmpComp: boolean = false;
  employee: any;
  Total: number = 0;
  PhotoFilePath = '';
  PhotoDetailFilePath = '';

  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.employee = {
      EmployeeID: '0',
      EmployeeName: '',
      Location: '',
      Title: 'VOYAGER',
      Tag: '',
      Tag2: '',
      Badge: '',
      Image: 'anonymous.png',
      ImageDetail: 'anonymous.png',
      Priority: 0
    };

    this.ModalTitle = 'Add Employee';
    this.ActivateAddEditEmpComp = true;
  }

  editClick(item: any) {
    this.employee = item;
    this.ModalTitle = 'Edit Employee';
    this.ActivateAddEditEmpComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteEmployee(item.EmployeeID).subscribe((data) => {
        alert(data.toString());
        this.refreshEmpList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }

  refreshEmpList() {
    this.service.getEmployeeList().subscribe((data) => {
      this.EmployeeList = data;
      this.Total = data.length;
    });
  }
}
