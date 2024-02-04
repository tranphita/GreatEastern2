import { formatDate } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';

declare var feather: any;
declare var Keyboard: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Input() search = '';

  listnhanvien: any;
  employees: any;
  employees_const: any;
  locations: any;
  banners: any;
  Pies = new Array();
  listdiadiem = new Array();
  activeTab = 0;
  activeTabsub = 'VOYAGER';
  empty = false;
  checkempty = '';
  page: number = 0;
  total: number = 0;

  tiles = [
    { Name: 'VOYAGER' },
    { Name: 'ADVENTURER' },
    { Name: 'EXPLORER' },
    { Name: 'JOURNEYMAN' },
  ];

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

  constructor(private service: ApiserviceService, private router: Router) {}

  ngOnInit() {
    // Lấy danh sách location và số liệu biểu đồ
    this.service.getLocationList().subscribe((data) => {
      if (data) {
        this.locations = data;
        data.forEach((value, index) => {
          this.listdiadiem.push({
            LocationID: value.LocationID,
            LocationName: value.LocationName,
            Title: this.tiles,
          });
        });
      }
    });

    // Lấy danh sách nhân viên theo Badge
    this.service.getEmployeeList().subscribe((data) => {
      var obj = this;
      obj.employees = data.filter(
        (item: { Badge: any }) => item.Badge != '' && item.Badge != null
      );

      if (obj.employees.length == 0) obj.empty = true;
      else {
        obj.empty = false;
        const locaArray = ['VOYAGER', 'ADVENTURER', 'EXPLORER', 'JOURNEYMAN'];
        obj.employees.sort(function (
          a: { Title: string },
          b: { Title: string }
        ) {
          return locaArray.indexOf(a.Title) - locaArray.indexOf(b.Title);
        });
      }

      obj.total = obj.employees.length;
      obj.employees_const = obj.employees;
    });

    // Lấy danh sách banner
    this.service.getBannerList().subscribe((data) => {
      this.banners = data;
    });

    // Lấy danh sách nhân viên cho tab Search và thực hiện group theo A-Z
    this.service.getEmployeeList().subscribe((data) => {
      this.listnhanvien = data
        .reduce((acc: any[], curr) => {
          const idx = acc.findIndex((e) => e.alphabet === curr.EmployeeName[0]);
          if (idx === -1) {
            acc.push({ alphabet: curr.EmployeeName[0], record: [curr] });
          } else {
            acc[idx].record.push(curr);
            acc[idx].record.sort(
              (r1: { EmployeeName: number }, r2: { EmployeeName: number }) =>
                r1.EmployeeName > r2.EmployeeName ? 1 : -1
            );
          }
          return acc;
        }, [])
        .sort((e1, e2) => (e1.alphabet > e2.alphabet ? 1 : -1));
    });

    var _url = this.router.url;
    if (_url) {
      switch (_url) {
        case '/#new':
          this.NewTab(0);
          break;
        case '/#all':
          this.AllTab(10, 'VOYAGER');
          break;
        case '/#list':
          this.activeTab = 20;
          break;
        default:
          break;
      }
    }

    setInterval(() => {
      this.tickTock();
      this.difference = this.targetTime - this.now;
      this.difference = this.difference / (1000 * 60 * 60 * 24);

      !isNaN(this.days.nativeElement.innerText)
        ? (this.days.nativeElement.innerText = Math.floor(this.difference))
        : (this.days.nativeElement.innerHTML = `<img src="https://i.gifer.com/VAyR.gif"/>`);
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
    this.seconds.nativeElement.innerText = _seconds < 10 ? ('0' + _seconds) : _seconds;
  }

  // Chức năng click Tab All
  AllTab(value: number, title: string) {
    // Active tab All
    this.activeTab = value;

    // Lấy danh sách nhân viên theo title
    this.service.getEmployeeList().subscribe((data) => {
      this.employees = data.filter(
        (item: { Title: any }) => item.Title.toUpperCase() == title
      );

      // kiểm tra danh sách nhân viên có giá trị không để thực hiện chèn background
      if (this.employees.length == 0) this.empty = true;
      else this.empty = false;

      this.total = this.employees.length;
      this.employees_const = this.employees;
    });
  }

  // Chức năng click Tab New
  NewTab(value: number) {
    // Active tab New
    this.activeTab = value;

    // Lấy danh sách nhân viên theo title
    this.service.getEmployeeList().subscribe((data) => {
      this.employees = data.filter(
        (item: { Badge: any }) => item.Badge != '' && item.Badge != null
      );

      // kiểm tra danh sách nhân viên có giá trị không để thực hiện chèn background
      if (this.employees.length == 0) this.empty = true;
      else {
        this.empty = false;
        const locaArray = ['VOYAGER', 'ADVENTURER', 'EXPLORER', 'JOURNEYMAN'];
        this.employees.sort(function (
          a: { Title: string },
          b: { Title: string }
        ) {
          return locaArray.indexOf(a.Title) - locaArray.indexOf(b.Title);
        });
      }

      this.total = this.employees.length;
      this.employees_const = this.employees;
    });
  }

  // Chức năng click Tab search
  SearchTab(value: number) {
    // Active tab search
    this.activeTab = value;

    // bật scroll
    (document.querySelector('.main-page') as HTMLElement).style.overflow =
      'visible';

    setTimeout(function () {
      // Tắt scroll
      (document.querySelector('.main-page') as HTMLElement).style.overflow =
        'hidden';
    }, 10);
  }

  onSelected(value: number, location: string, title: string): void {
    this.activeTab = value;
    this.service.getEmployeeList().subscribe((datae) => {
      this.employees = datae.filter(
        (item: { Location: any; Title: any }) =>
          item.Location == location && item.Title.toUpperCase() == title
      );
      if (this.employees.length == 0) this.empty = true;
      else this.empty = false;
      this.total = this.employees.length;
      this.employees_const = this.employees;
    });
  }

  // Chức năng click tab sub
  clickTitle(location: string, title: string) {
    // Active tab sub đã chọn
    this.activeTabsub = title;

    // Lấy danh sách nhân viên theo location và title
    this.service.getEmployeeList().subscribe((datae) => {
      this.employees = datae.filter(
        (item: { Location: any; Title: any }) =>
          item.Location == location && item.Title.toUpperCase() == title
      );

      // kiểm tra danh sách nhân viên có giá trị không để thực hiện chèn background
      if (this.employees.length == 0) this.empty = true;
      else this.empty = false;
      this.total = this.employees.length;
      this.employees_const = this.employees;
    });
  }

  // Chức năng click tab sub
  clickTitleAll(title: string) {
    // Active tab sub đã chọn
    this.activeTabsub = title;

    // Lấy danh sách nhân viên theo title
    this.service.getEmployeeList().subscribe((datae) => {
      this.employees = datae.filter(
        (item: { Title: any }) => item.Title.toUpperCase() == title
      );

      // kiểm tra danh sách nhân viên có giá trị không để thực hiện chèn background
      if (this.employees.length == 0) this.empty = true;
      else this.empty = false;
      this.total = this.employees.length;
      this.employees_const = this.employees;
    });
  }

  // Chức năng Search
  onKey(event: any) {
    // khai báo Key đã nhập
    var param = event.target.value;

    // lấy thông tin nhân viên theo key đã nhập
    this.service.getEmployeeList().subscribe((data) => {
      var _data = data.filter((a) =>
        a.EmployeeName.toUpperCase().includes(param.toUpperCase())
      );

      // Tạo danh sách nhân viên đã lấy được theo group A-Z
      this.listnhanvien = _data
        .reduce((acc: any[], curr) => {
          const idx = acc.findIndex((e) => e.alphabet === curr.EmployeeName[0]);
          if (idx === -1) {
            acc.push({ alphabet: curr.EmployeeName[0], record: [curr] });
          } else {
            acc[idx].record.push(curr);
            acc[idx].record.sort(
              (r1: { EmployeeName: number }, r2: { EmployeeName: number }) =>
                r1.EmployeeName > r2.EmployeeName ? 1 : -1
            );
          }
          return acc;
        }, [])
        .sort((e1, e2) => (e1.alphabet > e2.alphabet ? 1 : -1));
    });
  }

  // Chức năng khi click vào nhóm A-Z
  clickAZ(name: any) {
    // Thực hiện bật scroll
    (document.querySelector('.main-page') as HTMLElement).style.overflow =
      'visible';

    setTimeout(function () {
      // Tắt Scroll
      (document.querySelector('.main-page') as HTMLElement).style.overflow =
        'hidden';
    }, 10);

    var element = document.querySelector('#' + name) as HTMLElement;
    if (element) element.scrollIntoView();
  }

  clickPrev() {
    if (this.page == 0) {
      this.employees = this.employees_const;
    } else {
      this.page = this.page - 1;
      var offset = 16 * this.page;
      this.employees = this.employees_const.slice(offset, this.total);
    }
  }

  clickNext() {
    this.page = this.page + 1;
    var offset = 16 * this.page;
    this.employees = this.employees_const.slice(offset, this.total);
  }
}
