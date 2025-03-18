import { ingredientsData, bunsData } from '../../testData';
import burgerConstructorReducer, {
  addIngredient,
  clearConstructor,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} from './burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid');

describe('Test BurgerCOnstructor', () => {
  const clearInitialState = {
    burgerConstructor: {
      bun: null,
      ingredients: []
    },
    error: null
  };
  const filledInitialState = {
    burgerConstructor: {
      bun: {
        ...bunsData[0],
        id: '0'
      },
      ingredients: [
        {
          ...ingredientsData[0],
          id: '1'
        },
        {
          ...ingredientsData[0],
          id: '2'
        }
      ]
    },
    error: null
  };

  (uuidv4 as jest.Mock).mockImplementation(() => 1);
  test('Add bun to constructor', () => {
    const [bun] = bunsData;
    const newState = burgerConstructorReducer(
      clearInitialState,
      addIngredient(bun)
    );
    const { burgerConstructor } = newState;
    expect(burgerConstructor.bun?.id).toEqual(1);
  });

  test('Update Bun', () => {
    const [_, bun] = bunsData;
    const newState = burgerConstructorReducer(
      filledInitialState,
      addIngredient(bun)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.bun?._id).not.toEqual(bunsData[0]._id);
  });
  test('Add Ingredient to empty constructor', () => {
    const [ingredient] = ingredientsData;
    const newState = burgerConstructorReducer(
      clearInitialState,
      addIngredient(ingredient)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients.length).toBe(1);
    expect(burgerConstructor.ingredients[0].id).toBe(1);
  });
  test('AddIngredient', () => {
    const [ingredient] = ingredientsData;
    const newState = burgerConstructorReducer(
      filledInitialState,
      addIngredient(ingredient)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients.length).toBe(3);
    expect(burgerConstructor.ingredients[2].id).toBe(1);
  });
  test('MoveUpIngredient', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      moveUpIngredient(1)
    );
    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients[0]._id).toBe(
      filledInitialState.burgerConstructor.ingredients[1]._id
    );
  });
  test('MoveDownIngredient', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      moveDownIngredient(0)
    );
    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients[1]._id).toBe(
      filledInitialState.burgerConstructor.ingredients[0]._id
    );
  });
  test('removeIngredient', () => {
    const removedIngredient =
      filledInitialState.burgerConstructor.ingredients[0];
    const newState = burgerConstructorReducer(
      filledInitialState,
      removeIngredient(removedIngredient)
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.ingredients.length).toBe(1);
    expect(burgerConstructor.ingredients).not.toContainEqual(removedIngredient);
  });
  test('ClearConstructor', () => {
    const newState = burgerConstructorReducer(
      filledInitialState,
      clearConstructor()
    );

    const { burgerConstructor } = newState;
    expect(burgerConstructor.bun).toBeNull();
    expect(burgerConstructor.ingredients.length).toBe(0);
  });
});
