import { ApplicationsEntity } from './applications.models';
import * as ApplicationsActions from './applications.actions';
import { State, initialState, reducer } from './applications.reducer';

describe('Applications Reducer', () => {
  const createApplicationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ApplicationsEntity);

  beforeEach(() => {});

  describe('valid Applications actions', () => {
    it('submitApplicationSuccess should return set the list of known Applications', () => {
      const applications = [
        createApplicationsEntity('PRODUCT-AAA'),
        createApplicationsEntity('PRODUCT-zzz'),
      ];
      const action = ApplicationsActions.submitApplicationSuccess({
        applications,
      });

      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
