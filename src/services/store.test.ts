import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store';
import burgerConstructorReducer, {
  burgerConstructorState
} from './slices/burgerConstructorSlice';
import feedReducer, { FeedState } from './slices/feedSlice';
import ingredientsReducer, {
  IngredientsState
} from './slices/ingredientsSlice';
import orderReducer, { OrderState } from './slices/orderSlice';
import userReducer, { UserState } from './slices/userSlice';

describe('Initial rootReducer', () => {
  const burgerConstructorInitialState: burgerConstructorState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    error: null
  };

  const feedInitialState: FeedState = {
    orders: [],
    isFeedsLoading: false,
    order: null,
    isOrderLoading: false,
    total: 0,
    totalToday: 0,
    error: null
  };

  const ingredientsInitialState: IngredientsState = {
    ingredients: [],
    isIngredientsLoading: false,
    error: null
  };

  const orderInitialState: OrderState = {
    order: null,
    isOrderLoading: false,
    error: null
  };

  const userInitialState: UserState = {
    isUserAuthenticated: false,
    isLoginUserRequest: false,
    user: null,
    orders: [],
    isOrdersRequest: false,
    error: null
  };

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      burgerConstructor: burgerConstructorInitialState,
      feed: feedInitialState,
      ingredients: ingredientsInitialState,
      order: orderInitialState,
      user: userInitialState
    }
  });

  test('Test BurgerConstructor', () => {
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorReducer(burgerConstructorInitialState, {
        type: 'TEST_ACTION'
      })
    );

    const addIngredientAction = { type: 'addIngredient' };
    store.dispatch(addIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const moveUpIngredientAction = { type: 'moveUpIngredient' };
    store.dispatch(moveUpIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const moveDownIngredientAction = { type: 'moveDownIngredient' };
    store.dispatch(moveDownIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const removeIngredientAction = { type: 'removeIngredient' };
    store.dispatch(removeIngredientAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );

    const clearConstructorAction = { type: 'clearConstructor' };
    store.dispatch(clearConstructorAction);
    expect(store.getState().burgerConstructor).toEqual(
      burgerConstructorInitialState
    );
  });

  test('Test Feed', () => {
    expect(store.getState().feed).toEqual(
      feedReducer(undefined, { type: 'TEST_ACTION' })
    );

    const getFeedsThunkAction = { type: 'getFeedsThunk' };
    store.dispatch(getFeedsThunkAction);
    expect(store.getState().feed).toEqual(feedInitialState);

    const getOrderByNumberThunkAction = { type: 'getOrderByNumberThunk' };
    store.dispatch(getOrderByNumberThunkAction);
    expect(store.getState().feed).toEqual(feedInitialState);
  });

  test('Test Ingredients', () => {
    expect(store.getState().ingredients).toEqual(
      ingredientsReducer(undefined, { type: 'TEST_ACTION' })
    );

    const getIngredientsThunkAction = { type: 'getIngredientsThunk' };
    store.dispatch(getIngredientsThunkAction);
    expect(store.getState().ingredients).toEqual(ingredientsInitialState);
  });

  test('Test Order', () => {
    expect(store.getState().order).toEqual(
      orderReducer(undefined, { type: 'TEST_ACTION' })
    );

    const clearOrderAction = { type: 'clearOrder' };
    store.dispatch(clearOrderAction);
    expect(store.getState().order).toEqual(orderInitialState);

    const orderBurgerThunkAction = { type: 'orderBurgerThunk' };
    store.dispatch(orderBurgerThunkAction);
    expect(store.getState().order).toEqual(orderInitialState);
  });

  test('Test User', () => {
    expect(store.getState().user).toEqual(
      userReducer(undefined, { type: 'TEST_ACTION' })
    );

    const clearErrorsAction = { type: 'clearErrors' };
    store.dispatch(clearErrorsAction);
    expect(store.getState().user).toEqual(userInitialState);

    const loginUserThunkAction = { type: 'loginUserThunk' };
    store.dispatch(loginUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const logoutUserThunkAction = { type: 'logoutUserThunk' };
    store.dispatch(logoutUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const getUserThunkAction = { type: 'getUserThunk' };
    store.dispatch(getUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const updateUserThunkAction = { type: 'updateUserThunk' };
    store.dispatch(updateUserThunkAction);
    expect(store.getState().user).toEqual(userInitialState);

    const getOrdersThunkAction = { type: 'getOrdersThunk' };
    store.dispatch(getOrdersThunkAction);
    expect(store.getState().user).toEqual(userInitialState);
  });
});
