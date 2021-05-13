import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsEntity } from '../../..';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ProductsEntity[]> {
    return this.httpClient.get<ProductsEntity[]>('http://localhost:3000/products');
  }
}
