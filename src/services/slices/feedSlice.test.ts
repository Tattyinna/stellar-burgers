import feedReducer, {
  FeedState,
  getFeedsThunk,
  getOrderByNumberThunk
} from './feedSlice';

import { userOrders } from '../../testData';
import { TFeedsResponse, TOrderResponse } from '../../utils/burger-api';

describe('Test Feed', () => {
  describe('getFeedsThunk', () => {
    test('pending', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const newState = feedReducer(
        initialState,
        getFeedsThunk.pending('pending')
      );

      expect(newState.isFeedsLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('rejected', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: true,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Error'
      };
      const newState = feedReducer(
        initialState,
        getFeedsThunk.rejected(error, 'rejected')
      );

      expect(newState.isFeedsLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('fulfilled', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: true,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const feeds: TFeedsResponse = {
        orders: userOrders,
        total: 10,
        totalToday: 20,
        success: true
      };

      const newState = feedReducer(
        initialState,
        getFeedsThunk.fulfilled(feeds, 'fulfilled')
      );

      expect(newState.orders).toEqual(userOrders);
      expect(newState.total).toEqual(10);
      expect(newState.totalToday).toEqual(20);
      expect(newState.isFeedsLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });

  describe('getOrderByNumberThunk', () => {
    test('pending', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: false,
        total: 0,
        totalToday: 0,
        error: null
      };

      const newState = feedReducer(
        initialState,
        getOrderByNumberThunk.pending('pending', 1)
      );

      expect(newState.isOrderLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('rejected', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: true,
        total: 0,
        totalToday: 0,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Error'
      };
      const newState = feedReducer(
        initialState,
        getOrderByNumberThunk.rejected(error, 'rejected', 1)
      );

      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });

    test('fulfilled', async () => {
      const initialState: FeedState = {
        orders: [],
        isFeedsLoading: false,
        order: null,
        isOrderLoading: true,
        total: 0,
        totalToday: 0,
        error: null
      };

      const orders: TOrderResponse = {
        orders: [userOrders[0]],
        success: true
      };

      const newState = feedReducer(
        initialState,
        getOrderByNumberThunk.fulfilled(orders, 'fulfilled', 1)
      );

      const [userOrder] = userOrders;

      expect(newState.order).toEqual(userOrder);
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});
