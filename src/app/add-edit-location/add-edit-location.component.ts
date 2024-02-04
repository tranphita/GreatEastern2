import { Component, Input, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-edit-location',
  templateUrl: './add-edit-location.component.html',
  styleUrls: ['./add-edit-location.component.css'],
})
export class AddEditLocationComponent implements OnInit {
  constructor(private service: ApiserviceService) {}
  @Input() location: any;

  LocationList: any = [];

  ngOnInit(): void {}

  addLocation() {

    if (!this.checkInputValue()) {
      return;
    }
    
    var data = {
      LocationName: this.location.LocationName,
      Chart: this.location.Chart,
    };

    this.service.addLocation(data).subscribe((res) => {
      this.service.getLocationList().subscribe((data) => {
        this.LocationList = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  updateLocation() {

    if (!this.checkInputValue()) {
      return;
    }

    var val = {
      LocationID: this.location.LocationID,
      LocationName: this.location.LocationName,
      Chart: this.location.Chart,
    };

    this.service.updateLocation(val).subscribe((res) => {
      this.service.getLocationList().subscribe((data) => {
        this.LocationList = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  checkInputValue() {
    if ((document.getElementById('LocationName') as any).value == '') {
      (
        document.getElementById('LocationName') as HTMLElement
      ).style.borderColor = 'red';
      return false;
    } else {
      (
        document.getElementById('LocationName') as HTMLElement
      ).style.removeProperty('border-color');
    }

    if ((document.getElementById('Chart') as any).value == '') {
      (document.getElementById('Chart') as HTMLElement).style.borderColor =
        'red';
      return false;
    } else {
      (document.getElementById('Chart') as HTMLElement).style.removeProperty(
        'border-color'
      );
    }

    return true;
  }
}
