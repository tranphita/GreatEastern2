import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  constructor(private service: ApiserviceService) {}

  BannerList: any = [];
  ModalTitle = '';
  ActivateAddEditBanComp: boolean = false;
  banner: any;
  PhotoFilePath = '';

  ngOnInit(): void {
    this.refreshBanList();
  }

  addClick() {
    this.banner = {
      BannerID: '0',
      BannerName: 'anonymous.png', 
      Priority: '',
    };

    this.ModalTitle = 'Add Banner';
    this.ActivateAddEditBanComp = true;
  }

  editClick(item: any) {
    this.banner = item;
    this.ModalTitle = 'Edit Banner';
    this.ActivateAddEditBanComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteBanner(item.BannerID).subscribe((data) => {
        alert(data.toString());
        this.refreshBanList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditBanComp = false;
    this.refreshBanList();
  }

  refreshBanList() {
    this.service.getBannerList().subscribe((data) => {
      this.BannerList = data;
    });
  }
}
