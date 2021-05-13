import { ApplicationsEntity } from './applications.models';
import {
  State,
  applicationsAdapter,
  initialState,
} from './applications.reducer';
import * as ApplicationsSelectors from './applications.selectors';

describe('Applications Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getApplicationsId = (it) => it['id'];
  const createApplicationsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ApplicationsEntity);

  let state;

  beforeEach(() => {
    state = {
      applications: applicationsAdapter.setAll(
        [
          createApplicationsEntity('PRODUCT-AAA'),
          createApplicationsEntity('PRODUCT-BBB'),
          createApplicationsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Applications Selectors', () => {
    it('getAllApplications() should return the list of Applications', () => {
      const results = ApplicationsSelectors.getAllApplications(state);
      const selId = getApplicationsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ApplicationsSelectors.getSelected(state);
      const selId = getApplicationsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getApplicationsLoaded() should return the current 'loading' status", () => {
      const result = ApplicationsSelectors.getApplicationsLoaded(state);

      expect(result).toBe(true);
    });

    it("getApplicationsError() should return the current 'error' state", () => {
      const result = ApplicationsSelectors.getApplicationsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
