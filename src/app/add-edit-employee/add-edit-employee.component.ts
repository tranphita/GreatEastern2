import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.css'],
})
export class AddEditEmployeeComponent implements OnInit {
  PhotoFilePath = '';
  PhotoDetailFilePath = '';
  BadgePath = '';
  LocationList: any = [];
  LocationID = 1;
  TitleList = [
    { Title: 'VOYAGER' },
    { Title: 'ADVENTURER' },
    { Title: 'EXPLORER' },
    { Title: 'JOURNEYMAN' },
  ];

  @Input() employee: any;

  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    this.loadEmployeeList();
    this.PhotoFilePath = this.service.photoUrl + this.employee.Image;
    this.PhotoDetailFilePath =
      this.service.photoDetailUrl + this.employee.ImageDetail;
    this.BadgePath = this.service.photoBadgelUrl + this.employee.Badge;
  }

  loadEmployeeList() {
    this.service.getAllLocationNames().subscribe((data: any) => {
      this.LocationList = data;

      if (this.employee.Location) {
        this.LocationID = data.find(
          (x: { LocationName: any }) => x.LocationName == this.employee.Location
        )?.LocationID;
      }
    });
  }

  addEmployee() {
    if (!this.checkInputValue()) {
      return;
    }

    var _location = this.LocationList.find(
      (x: { LocationID: any }) => x.LocationID == this.LocationID
    )?.LocationName;

    var data = {
      EmployeeID: this.employee.EmployeeID,
      EmployeeName: this.employee.EmployeeName,
      Location: _location,
      Title: this.employee.Title,
      Tag: this.employee.Tag,
      Tag2: this.employee.Tag2,
      Badge: this.employee.Badge,
      Image: this.employee.Image,
      ImageDetail: this.employee.ImageDetail,
      Priority: this.employee.Priority,
    };

    this.service.addEmployee(data).subscribe((res) => {
      this.service.getEmployeeList().subscribe((data) => {
        this.employee = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  updateEmployee() {
    if (!this.checkInputValue()) {
      return;
    }

    var _location = this.LocationList.find(
      (x: { LocationID: any }) => x.LocationID == this.LocationID
    )?.LocationName;

    var data = {
      EmployeeID: this.employee.EmployeeID,
      EmployeeName: this.employee.EmployeeName,
      Location: _location,
      Title: this.employee.Title,
      Tag: this.employee.Tag,
      Tag2: this.employee.Tag2,
      Badge: this.employee.Badge,
      Image: this.employee.Image,
      ImageDetail: this.employee.ImageDetail,
      Priority: this.employee.Priority,
    };

    this.service.updateEmployee(data).subscribe((res) => {
      this.service.getEmployeeList().subscribe((data) => {
        this.employee = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  uploadPhotoBadge(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhotoBadge(formData).subscribe((data: any) => {
      this.employee.Badge = data.toString();
      this.BadgePath = this.service.photoBadgelUrl + this.employee.Badge;
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhoto(formData).subscribe((data: any) => {
      this.employee.Image = data.toString();
      this.PhotoFilePath = this.service.photoUrl + this.employee.Image;
    });
  }

  uploadPhotoDetail(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhotoDetail(formData).subscribe((data: any) => {
      this.employee.ImageDetail = data.toString();
      this.PhotoDetailFilePath =
        this.service.photoDetailUrl + this.employee.ImageDetail;
    });
  }

  removeBadge() {
    this.employee.Badge = '';
    this.BadgePath = '';
  }

  checkInputValue() {
    if ((document.getElementById('EmployeeName') as any).value == '') {
      (
        document.getElementById('EmployeeName') as HTMLElement
      ).style.borderColor = 'red';
      return false;
    } else {
      (
        document.getElementById('EmployeeName') as HTMLElement
      ).style.removeProperty('border-color');
    }

    if ((document.getElementById('Title') as any).value == '') {
      (document.getElementById('Title') as HTMLElement).style.borderColor =
        'red';
      return false;
    } else {
      (document.getElementById('Title') as HTMLElement).style.removeProperty(
        'border-color'
      );
    }

    if ((document.getElementById('Tag') as any).value == '') {
      (document.getElementById('Tag') as HTMLElement).style.borderColor = 'red';
      return false;
    } else {
      (document.getElementById('Tag') as HTMLElement).style.removeProperty(
        'border-color'
      );
    }

    return true;
  }
}
