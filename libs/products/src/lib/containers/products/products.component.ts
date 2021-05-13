import { Component, OnInit } from '@angular/core';
import { ProductsFacade } from '../../..';

@Component({
  selector: 'remote-insurance-corp-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$ = this.productFacade.allProducts$;

  constructor(private productFacade: ProductsFacade) { }

  ngOnInit(): void {
    this.productFacade.init();
  }

}
