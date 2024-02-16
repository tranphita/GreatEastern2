import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { Router } from '@angular/router';

declare var feather: any;
declare var Keyboard: any;
declare var $: any;

@Component({
  selector: 'app-list-gallery',
  templateUrl: './list-gallery.component.html',
  styleUrls: ['./list-gallery.component.css'],
})
export class ListGalleryComponent implements OnInit {
  @Input() search = '';
  banners: any;
  gallerys: any;

  // ---- Start xử lý đồng hồ đếm ngược -----//
  date: any;
  now: any;
  targetDate: any = new Date('November 30, 2024');
  targetTime: any = this.targetDate.getTime();
  difference!: number;

  @ViewChild('days', { static: true }) days!: ElementRef;
  @ViewChild('hours', { static: true }) hours!: ElementRef;
  @ViewChild('minutes', { static: true }) minutes!: ElementRef;
  @ViewChild('seconds', { static: true }) seconds!: ElementRef;

  // ---- End xử lý đồng hồ đếm ngược -----//

  constructor(
    private service: ApiserviceService,
    private router: Router,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Lấy danh sách banner
    this.service.getBannerList().subscribe((data) => {
      this.banners = data;
    });

    // Lấy danh sách gallery
    this.service.getGalleryList().subscribe((data) => {
      this.gallerys = data;
    });

    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif"/>`);

      this.initFancybox();
      this.initZoomTransition();
    }, 100);

    feather.replace();
    Keyboard.init();
  }

  tickTock() {
    this.date = new Date();
    this.now = this.date.getTime();

    var _hours = 23 - this.date.getHours();
    var _minutes = 60 - this.date.getMinutes();
    var _seconds = 60 - this.date.getSeconds();

    this.days.nativeElement.innerText = Math.floor(this.difference);
    this.hours.nativeElement.innerText = _hours < 10 ? '0' + _hours : _hours;
    this.minutes.nativeElement.innerText =
      _minutes < 10 ? '0' + _minutes : _minutes;
    this.seconds.nativeElement.innerText =
      _seconds < 10 ? '0' + _seconds : _seconds;
  }

  private initFancybox(): void {
    $('.fancybox').fancybox({
      openEffect: 'none',
      closeEffect: 'none',
    });
  }

  private initZoomTransition(): void {
    const elements = this.el.nativeElement.querySelectorAll('.zoom');

    elements.forEach((element: any) => {
      this.renderer.listen(element, 'mouseover', () => {
        this.renderer.addClass(element, 'transition');
      });

      this.renderer.listen(element, 'mouseout', () => {
        this.renderer.removeClass(element, 'transition');
      });
    });
  }
}
