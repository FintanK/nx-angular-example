import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ApplicationsActions from './applications.actions';
import { ApplicationsEntity } from './applications.models';

export const APPLICATIONS_FEATURE_KEY = 'applications';

export interface State extends EntityState<ApplicationsEntity> {
  selectedId?: string | number; // which Applications record has been selected
  loading: boolean; // has the Applications list been loading
  error?: string | null; // last known error (if any)
}

export interface ApplicationsPartialState {
  readonly [APPLICATIONS_FEATURE_KEY]: State;
}

export const applicationsAdapter: EntityAdapter<ApplicationsEntity> = createEntityAdapter<ApplicationsEntity>();

export const initialState: State = applicationsAdapter.getInitialState({
  loading: false,
});

const applicationsReducer = createReducer(
  initialState,
  on(ApplicationsActions.submitApplication, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ApplicationsActions.submitApplicationSuccess, (state, { application }) =>
    applicationsAdapter.setOne(application, { ...state, loading: false })
  ),
  on(ApplicationsActions.submitApplicationFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return applicationsReducer(state, action);
}
