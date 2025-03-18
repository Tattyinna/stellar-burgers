import ingredientsReducer, {
  IngredientsState,
  getIngredientsThunk
} from './ingredientsSlice';

import { bunsData } from '../../testData';

describe('Ingredients', () => {
  describe('getIngredientsThunk', () => {
    test('pending', async () => {
      const initialState: IngredientsState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      };

      const newState = ingredientsReducer(
        initialState,
        getIngredientsThunk.pending('pending')
      );

      expect(newState.isIngredientsLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('rejected', async () => {
      const initialState: IngredientsState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Error'
      };
      const newState = ingredientsReducer(
        initialState,
        getIngredientsThunk.rejected(error, 'rejected')
      );

      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('fulfilled', async () => {
      const initialState: IngredientsState = {
        ingredients: [],
        isIngredientsLoading: false,
        error: null
      };

      const newState = ingredientsReducer(
        initialState,
        getIngredientsThunk.fulfilled(bunsData, 'fulfilled')
      );

      expect(newState.ingredients).toEqual(bunsData);
      expect(newState.isIngredientsLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
