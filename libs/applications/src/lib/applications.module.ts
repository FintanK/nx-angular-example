import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ApplicationsEffects } from './+state/applications.effects';
import { ApplicationsFacade } from './+state/applications.facade';
import * as fromApplications from './+state/applications.reducer';
import { ApplicationsComponent } from './containers/applications/applications.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ApplicationsComponent },
    ]),
    StoreModule.forFeature(
      fromApplications.APPLICATIONS_FEATURE_KEY,
      fromApplications.reducer
    ),
    EffectsModule.forFeature([ApplicationsEffects]),
  ],
  providers: [ApplicationsFacade],
  declarations: [
    ApplicationsComponent
  ],
})
export class ApplicationsModule {}
