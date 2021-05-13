import { createAction, props } from '@ngrx/store';
import { ApplicationsEntity } from './applications.models';

export const submitApplication = createAction('[Applications] Submit');

export const submitApplicationSuccess = createAction(
  '[Applications] Submit Success',
  props<{ application: ApplicationsEntity }>()
);

export const submitApplicationFailure = createAction(
  '[Applications] Submit Failure',
  props<{ error: any }>()
);
