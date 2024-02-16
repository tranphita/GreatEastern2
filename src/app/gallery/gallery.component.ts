import { Component } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent {
  constructor(private service: ApiserviceService) {}

  GalleryList: any = [];
  ModalTitle = '';
  ActivateAddEditGalComp: boolean = false;
  gallery: any;
  PhotoFilePath = '';

  ngOnInit(): void {
    this.refreshBanList();
  }

  addClick() {
    this.gallery = {
      Id: '0',
      Name: 'anonymous.png', 
      Priority: '',
    };

    this.ModalTitle = 'Add gallery';
    this.ActivateAddEditGalComp = true;
  }

  editClick(item: any) {
    this.gallery = item;
    this.ModalTitle = 'Edit gallery';
    this.ActivateAddEditGalComp = true;
  }

  deleteClick(item: any) {
    if (confirm('Are you sure??')) {
      this.service.deleteGallery(item.Id).subscribe((data) => {
        alert(data.toString());
        this.refreshBanList();
      });
    }
  }

  closeClick() {
    this.ActivateAddEditGalComp = false;
    this.refreshBanList();
  }

  refreshBanList() {
    this.service.getGalleryList().subscribe((data) => {
      this.GalleryList = data;
    });
  }
}
