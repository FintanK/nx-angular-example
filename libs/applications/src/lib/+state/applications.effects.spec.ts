import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ApplicationsEffects } from './applications.effects';
import * as ApplicationsActions from './applications.actions';

describe('ApplicationsEffects', () => {
  let actions: Observable<any>;
  let effects: ApplicationsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ApplicationsEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(ApplicationsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ApplicationsActions.submitApplication() });

      const expected = hot('-a-|', {
        a: ApplicationsActions.submitApplicationSuccess({ applications: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
