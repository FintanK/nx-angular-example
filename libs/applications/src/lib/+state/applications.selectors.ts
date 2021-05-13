import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APPLICATIONS_FEATURE_KEY,
  State,
  ApplicationsPartialState,
  applicationsAdapter,
} from './applications.reducer';

// Lookup the 'Applications' feature state managed by NgRx
export const getApplicationsState = createFeatureSelector<
  ApplicationsPartialState,
  State
>(APPLICATIONS_FEATURE_KEY);

const { selectAll, selectEntities } = applicationsAdapter.getSelectors();

export const getApplicationsLoaded = createSelector(
  getApplicationsState,
  (state: State) => state.loading
);

export const getApplicationsError = createSelector(
  getApplicationsState,
  (state: State) => state.error
);

export const getAllApplications = createSelector(
  getApplicationsState,
  (state: State) => selectAll(state)
);

export const getApplicationsEntities = createSelector(
  getApplicationsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getApplicationsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getApplicationsEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
