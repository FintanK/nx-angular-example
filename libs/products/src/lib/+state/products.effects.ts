import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductsService } from '../services/products/products.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private productService: ProductsService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.init),
      mergeMap(() =>
        this.productService
          .getProducts()
          .pipe(
            map(
              (products) =>
                ProductsActions.loadProductsSuccess({products})
            ),
            catchError(error => {
              return of( ProductsActions.loadProductsFailure( error ) );
            })
          )
      )
    )
  );


}
