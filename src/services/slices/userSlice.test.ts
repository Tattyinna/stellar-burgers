import userReducer, {
  UserState,
  clearErrors,
  getOrdersThunk
} from './userSlice';

import { userOrders } from '../../testData';

describe('User', () => {
  describe('getOrdersThunk', () => {
    test('pending', async () => {
      const initialState: UserState = {
        isUserAuthenticated: false,
        isLoginUserRequest: false,
        user: null,
        orders: [],
        isOrdersRequest: false,
        error: null
      };
      const newState = userReducer(
        initialState,
        getOrdersThunk.pending('pending')
      );

      expect(newState.isOrdersRequest).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('rejected', async () => {
      const initialState: UserState = {
        isUserAuthenticated: false,
        isLoginUserRequest: false,
        user: null,
        orders: [],
        isOrdersRequest: true,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Error'
      };
      const newState = userReducer(
        initialState,
        getOrdersThunk.rejected(error, 'rejected')
      );

      expect(newState.isOrdersRequest).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('fulfilled', async () => {
      const initialState: UserState = {
        isUserAuthenticated: false,
        isLoginUserRequest: false,
        user: null,
        orders: [],
        isOrdersRequest: true,
        error: null
      };

      const newState = userReducer(
        initialState,
        getOrdersThunk.fulfilled(userOrders, 'fulfilled')
      );

      expect(newState.orders).toEqual(userOrders);
      expect(newState.isOrdersRequest).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});

describe('User', () => {
  test('clearErrors', () => {
    const initialState: UserState = {
      isUserAuthenticated: false,
      isLoginUserRequest: false,
      user: null,
      orders: [],
      isOrdersRequest: false,
      error: 'Error'
    };

    const newOrder = userReducer(initialState, clearErrors());
    expect(newOrder.error).toBeNull();
  });
});
