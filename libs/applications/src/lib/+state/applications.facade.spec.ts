import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { ApplicationsEntity } from './applications.models';
import { ApplicationsEffects } from './applications.effects';
import { ApplicationsFacade } from './applications.facade';

import * as ApplicationsSelectors from './applications.selectors';
import * as ApplicationsActions from './applications.actions';
import {
  APPLICATIONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './applications.reducer';

interface TestSchema {
  applications: State;
}

describe('ApplicationsFacade', () => {
  let facade: ApplicationsFacade;
  let store: Store<TestSchema>;
  const createApplicationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ApplicationsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(APPLICATIONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([ApplicationsEffects]),
        ],
        providers: [ApplicationsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ApplicationsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loading == true', async (done) => {
      try {
        let list = await readFirst(facade.allApplications$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.init();

        list = await readFirst(facade.allApplications$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `submitApplicationSuccess` to manually update list
     */
    it('allApplications$ should return the loading list; and loading flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allApplications$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        store.dispatch(
          ApplicationsActions.submitApplicationSuccess({
            applications: [
              createApplicationsEntity('AAA'),
              createApplicationsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allApplications$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
