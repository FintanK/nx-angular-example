import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as ApplicationsActions from './applications.actions';
import * as ApplicationsSelectors from './applications.selectors';

@Injectable()
export class ApplicationsFacade {
  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(
    select(ApplicationsSelectors.getApplicationsLoaded)
  );
  allApplications$ = this.store.pipe(
    select(ApplicationsSelectors.getAllApplications)
  );
  selectedApplications$ = this.store.pipe(
    select(ApplicationsSelectors.getSelected)
  );

  constructor(private store: Store) {}

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(ApplicationsActions.submitApplication());
  }
}
