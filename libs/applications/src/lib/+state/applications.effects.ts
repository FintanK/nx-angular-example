import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApplicationsService } from '../services/applications/applications.service';
import * as ApplicationsActions from './applications.actions';

@Injectable()
export class ApplicationsEffects {
  constructor(
    private actions$: Actions,
    private applicationsService: ApplicationsService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ApplicationsActions.submitApplication),
      mergeMap(() =>
        this.applicationsService
          .submitApplication()
          .pipe(
            map(
              (application) =>
                ApplicationsActions.submitApplicationSuccess({application})
            ),
            catchError(error => {
              return of( ApplicationsActions.submitApplicationFailure( error ) );
            })
          )
      )
    )
  );
}
