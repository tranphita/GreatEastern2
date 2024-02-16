import { Component, Input } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';

@Component({
  selector: 'app-add-edit-gallery',
  templateUrl: './add-edit-gallery.component.html',
  styleUrls: ['./add-edit-gallery.component.css'],
})
export class AddEditGalleryComponent {
  PhotoFilePath = '';
  PhotoDetailFilePath = '';

  @Input() gallery: any;

  constructor(private service: ApiserviceService) {}

  ngOnInit(): void {
    this.PhotoFilePath =
      this.service.photoUrl + 'Gallerys/' + this.gallery.Name;
  }

  addGallery() {
    if (!this.checkInputValue()) {
      return;
    }
    debugger;
    var data = {
      Id: this.gallery.Id,
      Name: this.gallery.Name,
      Priority: this.gallery.Priority,
    };

    this.service.addGallery(data).subscribe((res) => {
      this.service.getGalleryList().subscribe((data) => {
        this.gallery = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  updateGallery() {
    if (!this.checkInputValue()) {
      return;
    }

    var data = {
      Id: this.gallery.Id,
      Name: this.gallery.Name,
      Priority: this.gallery.Priority,
    };

    this.service.updateGallery(data).subscribe((res) => {
      this.service.getGalleryList().subscribe((data) => {
        this.gallery = data;
        document.getElementById('ModalClose')?.click();
      });
    });
  }

  uploadPhoto(event: any) {
    var file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.service.uploadPhotoGallery(formData).subscribe((data: any) => {
      this.gallery.Name = data.toString();
      this.PhotoFilePath =
        this.service.photoUrl + 'Gallerys/' + this.gallery.Name;
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
