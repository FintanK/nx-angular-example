import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductsEffects } from './+state/products.effects';
import { ProductsFacade } from './+state/products.facade';
import * as fromProducts from './+state/products.reducer';
import { ProductsComponent } from './containers/products/products.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductsComponent },
    ]),
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
  ],
  declarations: [ProductsComponent],
  providers: [ProductsFacade],
})
export class ProductsModule {}
