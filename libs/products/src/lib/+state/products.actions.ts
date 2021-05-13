import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from './products.models';

export const init = createAction('[Products] Products Load');

export const loadProductsSuccess = createAction(
  '[Products] Load Success',
  props<{ products: ProductsEntity[] }>()
);

export const loadProductsFailure = createAction(
  '[Products] Load Failure',
  props<{ error: any }>()
);
