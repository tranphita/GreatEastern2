import { Component, Input } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-edit-banner',
  templateUrl: './add-edit-banner.component.html',
  styleUrls: ['./add-edit-banner.component.css'],
})
export class AddEditBannerComponent {
  PhotoFilePath = '';
  PhotoDetailFilePath = '';
  LocationList: any = [];
  LocationID = 1;

  @Input() banner: any;

  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    this.PhotoFilePath =
      this.service.photoUrl + 'Banners/' + this.banner.BannerName;
  }

  addBanner() {
    if (!this.checkInputValue()) {
      return;
    }
    
    var data = {
      BannerID: this.banner.BannerID,
      BannerName: this.banner.BannerName,
      Priority: this.banner.Priority,
    };

    this.service.addBanner(data).subscribe((res) => {
      this.service.getBannerList().subscribe((data) => {
        this.banner = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  updateBanner() {
    if (!this.checkInputValue()) {
      return;
    }

    var data = {
      BannerID: this.banner.BannerID,
      BannerName: this.banner.BannerName,
      Priority: this.banner.Priority,
    };

    this.service.updateBanner(data).subscribe((res) => {
      this.service.getBannerList().subscribe((data) => {
        this.banner = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhotoBanner(formData).subscribe((data: any) => {
      this.banner.BannerName = data.toString();
      this.PhotoFilePath =
        this.service.photoUrl + 'Banners/' + this.banner.BannerName;
    });
  }

  checkInputValue() {
    if ((document.getElementById('Priority') as any).value == '') {
      (
        document.getElementById('Priority') as HTMLElement
      ).style.borderColor = 'red';
      return false;
    } else {
      (
        document.getElementById('Priority') as HTMLElement
      ).style.removeProperty('border-color');
    }

    return true;
  }

}
