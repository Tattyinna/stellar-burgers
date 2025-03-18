import { TIngredient, TOrder } from './utils/types';

export const bunsData: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

export const ingredientsData: TIngredient[] = [
  {
    _id: '643d69a5c3f7b9001cfa093e',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0940',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0944',
    name: 'Соус традиционный галактический',
    type: 'sauce',
    proteins: 42,
    fat: 24,
    carbohydrates: 42,
    calories: 99,
    price: 15,
    image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
  }
];

export const order: TOrder = {
  _id: 'testOrderIdNew',
  status: 'new',
  name: 'test order',
  createdAt: '2024-04-27T07:59:55.703Z',
  updatedAt: '2024-04-27T07:59:56.203Z',
  number: 1,
  ingredients: [
    '643d69a5c3f7b9001cfa093d',
    '643d69a5c3f7b9001cfa0940',
    '643d69a5c3f7b9001cfa093d'
  ]
};

export const userOrders: TOrder[] = [
  {
    _id: '67d9272c6fce7d001db5ace7',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-03-18T07:56:28.414Z',
    updatedAt: '2025-03-18T07:56:29.087Z',
    number: 71465
  },
  {
    _id: '67d926eb6fce7d001db5ace4',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-03-18T07:55:23.499Z',
    updatedAt: '2025-03-18T07:55:24.218Z',
    number: 71464
  },
  {
    _id: '67d925076fce7d001db5ace2',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
    status: 'done',
    name: 'Space флюоресцентный бургер',
    createdAt: '2025-03-18T07:47:19.787Z',
    updatedAt: '2025-03-18T07:47:20.589Z',
    number: 71463
  }
];

export const ingredients: TIngredient[] = [...bunsData, ...ingredientsData];
