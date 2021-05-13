import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApplicationsEntity } from '../../..';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  constructor(private httpClient: HttpClient) {}

  submitApplication(): Observable<ApplicationsEntity> {
    return this.httpClient.get<ApplicationsEntity>('http://localhost:3000/products');
  }
}
