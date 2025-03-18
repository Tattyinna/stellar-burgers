import orderReducer, {
  OrderState,
  clearOrder,
  orderBurgerThunk
} from './orderSlice';

import { order } from '../../testData';
import { TNewOrderResponse } from '../../utils/burger-api';

describe('Order', () => {
  describe('orderBurgerThunk', () => {
    test('pending', async () => {
      const initialState: OrderState = {
        order: null,
        isOrderLoading: false,
        error: null
      };

      const newState = orderReducer(
        initialState,
        orderBurgerThunk.pending('pending', order.ingredients)
      );

      expect(newState.isOrderLoading).toBeTruthy();
      expect(newState.error).toBeNull();
    });
    test('rejected', async () => {
      const initialState: OrderState = {
        order: null,
        isOrderLoading: true,
        error: null
      };

      const error: Error = {
        name: 'rejected',
        message: 'Error'
      };
      const newState = orderReducer(
        initialState,
        orderBurgerThunk.rejected(error, 'rejected', order.ingredients)
      );

      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBe(error.message);
    });
    test('fulfilled', async () => {
      const initialState: OrderState = {
        order: null,
        isOrderLoading: true,
        error: null
      };

      const newOrder: TNewOrderResponse = {
        order: order,
        name: 'New Order',
        success: true
      };

      const newState = orderReducer(
        initialState,
        orderBurgerThunk.fulfilled(newOrder, 'fulfilled', order.ingredients)
      );

      expect(newState.order).toEqual(order);
      expect(newState.isOrderLoading).toBeFalsy();
      expect(newState.error).toBeNull();
    });
  });
});

describe('Order', () => {
  test('clearOrder', () => {
    const initialState: OrderState = {
      order: order,
      isOrderLoading: false,
      error: null
    };

    const newOrder = orderReducer(initialState, clearOrder());
    expect(newOrder).toEqual({
      order: null,
      isOrderLoading: false,
      error: null
    });
  });
});
