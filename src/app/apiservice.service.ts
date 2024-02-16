import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  // readonly apiUrl = 'https://api.reachforgreat-winners.com/api/';
  // readonly photoUrl = 'https://api.reachforgreat-winners.com/Photos/';
  // readonly photoDetailUrl = 'https://api.reachforgreat-winners.com/Photos/Details/';
  // readonly photoBadgelUrl = 'https://api.reachforgreat-winners.com/Photos/Badges/';

  readonly apiUrl = 'https://localhost:7233/api/';
  readonly photoUrl = 'https://localhost:7233/Photos/';
  readonly photoDetailUrl = 'https://localhost:7233/Photos/Details/';
  readonly photoBadgelUrl = 'https://localhost:7233/Photos/Badges/';

  private refreshrequired = new Subject<any>();

  constructor(private http: HttpClient) {}

  get Refreshrequired() {
    return this.refreshrequired;
  }

  // Location
  getLocationList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Location/GetLocation');
  }

  getLocationByID(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Location/GetLocation');
  }

  getAllLocationNames(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Employee/GetAllLocationNames');
  }

  addLocation(location: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<any>(
      this.apiUrl + 'Location/AddLocation',
      location,
      httpOptions
    );
  }

  updateLocation(location: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put(
      this.apiUrl + 'Location/UpdateLocation/',
      location,
      httpOptions
    );
  }

  deleteLocation(ID: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.delete<number>(
      this.apiUrl + 'Location/DeleteLocation/' + ID,
      httpOptions
    );
  }



  // Employee
  getEmployeeList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Employee/GetEmployee');
  }

  getEmployeeByID(ID: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Employee/GetEmployeeByID/' + ID);
  }

  addEmployee(emp: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post<any>(
      this.apiUrl + 'Employee/AddEmployee',
      emp,
      httpOptions
    );
  }

  updateEmployee(emp: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.put<any>(
      this.apiUrl + 'Employee/UpdateEmployee',
      emp,
      httpOptions
    );
  }

  deleteEmployee(empId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.delete<number>(
      this.apiUrl + 'Employee/DeleteEmployee/' + empId,
      httpOptions
    );
  }

  uploadPhotoBadge(photo: any) {
    return this.http.post(this.apiUrl + 'Employee/SaveFileBadge', photo);
  }

  uploadPhoto(photo: any) {
    return this.http.post(this.apiUrl + 'Employee/SaveFile', photo);
  }

  uploadPhotoDetail(photo: any) {
    return this.http.post(this.apiUrl + 'Employee/SaveFileDetail', photo);
  }


   // Banner
   getBannerList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Banner/GetBanner');
  }

  getBannerByID(ID: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Banner/GetBannerByID/' + ID);
  }

  addBanner(emp: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Banner/AddBanner',
      emp
    );
  }

  updateBanner(emp: any): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + 'Banner/UpdateBanner',
      emp
    );
  }

  deleteBanner(empId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.delete<number>(
      this.apiUrl + 'Banner/DeleteBanner/' + empId,
      httpOptions
    );
  }

  uploadPhotoBanner(photo: any) {
    return this.http.post(this.apiUrl + 'Banner/SaveFile', photo);
  }


   // Gallery
   getGalleryList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Gallery/GetGallery');
  }

  getGalleryByID(ID: number): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + 'Gallery/GetGalleryByID/' + ID);
  }

  addGallery(emp: any): Observable<any> {
    return this.http.post<any>(
      this.apiUrl + 'Gallery/AddGallery',
      emp
    );
  }

  updateGallery(emp: any): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + 'Gallery/UpdateGallery',
      emp
    );
  }

  deleteGallery(empId: number): Observable<number> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.delete<number>(
      this.apiUrl + 'Gallery/DeleteGallery/' + empId,
      httpOptions
    );
  }

  uploadPhotoGallery(photo: any) {
    return this.http.post(this.apiUrl + 'Gallery/SaveFile', photo);
  }

}
