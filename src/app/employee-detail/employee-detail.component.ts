import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../apiservice.service';
import { Location } from '@angular/common';

declare var $: any;

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {
  banners: any;
  qrCode = 'http://localhost:51881?id=';
  detail: any;

  constructor(
    private route: ActivatedRoute,
    private service: ApiserviceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.detail = {
      Badge: '',
      EmployeeID: 0,
      EmployeeName: '',
      Image: '',
      ImageDetail: '',
      Location: '',
      Tag: '',
      Tag2: '',
      Title: '',
    };

    // Lấy danh sách banner
    this.service.getBannerList().subscribe((data) => {
      this.banners = data;
    });

    this.route.params.subscribe((params) => {
      this.service
        .getEmployeeByID(params['EmployeeID'])
        .subscribe((data: any) => {
          this.detail = data;
          console.log(data);
          this.qrCode =
            'https://reachforgreat-winners.com/#/employee-detail/' +
            data.EmployeeID;
          var obj = this;
          setTimeout(function () {
            obj.callMe(data.ImageDetail);
          }, 100);
        });
    });
  }

  back() {
    this.location.back();
  }

  callMe(imagedetail: string) {
    if (imagedetail == '' || imagedetail == null) imagedetail = 'detail.jpg';

    $('#tsparticles')
      .particles()
      .init({
        fullScreen: false,
        background: {
          image:
            'url(https://api.reachforgreat-winners.com/Photos/Details/' +
            imagedetail +
            ')',
          repeat: 'no-repeat',
          position: 'center top 40px',
          size: '225px 245px',
        },
        particles: {
          angle: {
            value: 0,
            offset: 30,
          },
          move: {
            enable: true,
            outModes: {
              top: 'none',
              default: 'destroy',
            },
            gravity: {
              enable: true,
            },
            speed: { min: 4, max: 20 },
            decay: 0.01,
          },
          number: {
            value: 0,
            limit: 300,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: ['image'],
            "options": {
              "image": [
                {
                  "src": "../../assets/image/confetti/1-01.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 10
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-02.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 8
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-03.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 10
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-47.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 7
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-05.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 8
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-06.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 5
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-07.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 6
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-08.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 5
                    }
                  }
                },
                {
                  "src": "../../assets/image/confetti/1-19.png",
                  "width": 22,
                  "height": 22,
                  "particles": {
                    "size": {
                      "value": 9
                    }
                  }
                },
              ]
            }
          },
          size: {
            value: { min: 3, max: 5 },
            animation: {
              count: 1,
              startValue: 'min',
              enable: true,
              speed: 3,
              sync: true,
            },
          },
          rotate: {
            value: {
              min: 0,
              max: 360,
            },
            direction: 'random',
            animation: {
              enable: true,
              speed: 30,
            },
          },
          tilt: {
            direction: 'random',
            enable: true,
            value: {
              min: 0,
              max: 360,
            },
            animation: {
              enable: true,
              speed: 30,
            },
          },
          roll: {
            darken: {
              enable: true,
              value: 25,
            },
            enable: true,
            speed: {
              min: 10,
              max: 20,
            },
          },
          wobble: {
            distance: 30,
            enable: true,
            speed: {
              min: -15,
              max: 15,
            },
          },
        },
        emitters: [
          this.baseEmitterConfig('top-right', { x: 0, y: 10 }),
          this.baseEmitterConfig('top-left', { x: 100, y: 10 }),
        ],
      });
  }

  baseEmitterConfig = (direction: any, position: any) => {
    return {
      direction,
      rate: {
        quantity: 15,
        delay: 0.3,
      },
      size: {
        width: 0,
        height: 0,
      },
      spawnColor: {
        value: '#ff0000',
        animation: {
          h: {
            enable: true,
            offset: {
              min: -1.4,
              max: 1.4,
            },
            speed: 2,
            sync: false,
          },
          l: {
            enable: true,
            offset: {
              min: 40,
              max: 60,
            },
            speed: 0,
            sync: false,
          },
        },
      },
      position,
    };
  };
}
