import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  constructor(private service: ApiserviceService) {}

  LocationList: any = [];
  ModalTitle = '';
  ActivateLocation: boolean = false;
  location: any;

  ngOnInit(): void {
    this.refreshLocationList();
  }

  addClick() {
    this.location = {
      LocationID: '0',
      LocationName: '',
      Chart: '',
    };
    
    this.ModalTitle = 'Add Location';
    this.ActivateLocation = true;
  }

  editClick(item: any) {
    this.location = item;
    this.ModalTitle = 'Edit Location';
    this.ActivateLocation = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteLocation(item.LocationID).subscribe((data) => {
        alert(data.toString());
        this.refreshLocationList();
      });
    }
  }

  closeClick() {
    this.ActivateLocation = false;
    this.refreshLocationList();
  }

  refreshLocationList() {  
    this.service.getLocationList().subscribe((data) => {
      this.LocationList = data;
    });
  }
}
