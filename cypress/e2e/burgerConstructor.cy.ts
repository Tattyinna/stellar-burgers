import * as authTokens from '../fixtures/token.json';
import * as orderData from '../fixtures/order.json';

describe('BurgerConsstructor', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000/');
  });
  describe('Add Buns and Ingredients', () => {
    it('Add Buns and Ingredients', () => {
      cy.request('/api/ingredients');

      cy.get(`[data-cy=bun] > .common_button`).first().click();
      cy.get(`[data-cy=main] > .common_button`).first().click();
      cy.get(`[data-cy=sauce] > .common_button`).first().click();

      const burgerConstructor = {
        bunTop: cy
          .get('.burgerConstructorContainer .constructor-element_pos_top')
          .first(),
        mainIngredient: cy
          .get('.burgerConstructorContainer ul li .constructor-element__text')
          .eq(0),
        sauceIngredient: cy
          .get('.burgerConstructorContainer ul li .constructor-element__text')
          .eq(1),
        bunBottom: cy
          .get('.burgerConstructorContainer .constructor-element_pos_bottom')
          .last()
      };

      burgerConstructor.bunTop.contains('Краторная булка N-200i (верх)');
      burgerConstructor.mainIngredient.contains(
        'Биокотлета из марсианской Магнолии'
      );
      burgerConstructor.sauceIngredient.contains('Соус Spicy-X');
      burgerConstructor.bunBottom.contains('Краторная булка N-200i (низ)');
    });
  });

  describe('Open Modal for Ingredient', () => {
    it('Open', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child');
      const header = modal.get('div:first-child > h3');

      header.contains('Краторная булка N-200i');
    });

    it('Close', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal');
      modal.get('div:first-child > button > svg').click();

      cy.get('modal').should('not.exist');
    });

    it('Close by click outside', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal');
      const overlay = modal.get('#modals > div:nth-child(2)');

      overlay.click({ force: true });

      cy.get('modal').should('not.exist');
    });
  });

  describe('Create Order', () => {
    beforeEach(() => {
      cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
      cy.setCookie('accessToken', authTokens.accessToken);
      localStorage.setItem('refreshToken', authTokens.refreshToken);
      cy.intercept('GET', 'api/auth/tokens', {
        fixture: 'token.json'
      });
      cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    });

    it('Full Create', () => {
      cy.get(`[data-cy=bun] > .common_button`).first().click();
      cy.get(`[data-cy=main] > .common_button`).first().click();
      cy.get(`[data-cy=sauce] > .common_button`).first().click();

      cy.get('.createOrderBtn').click();

      const orderModal = cy.get('#modals > div:first-child');
      const orderNumber = orderModal.get('div:nth-child(2) > h2');

      orderNumber.contains(orderData.order.number);

      orderModal
        .get('div:first-child > div:first-child > button > svg')
        .click();

      cy.get('modal').should('not.exist');

      const burgerCunstructor = {
        constructorBunTop: cy.get('.burgerConstructorContainer > div'),
        constructoMainIngredient: cy.get(
          '.burgerConstructorContainer > ul > div'
        ),
        constructorBunBottom: cy.get(
          '.burgerConstructorContainer > div:nth-child(3)'
        )
      };

      burgerCunstructor.constructorBunTop.contains('Выберите булки');
      burgerCunstructor.constructoMainIngredient.contains('Выберите начинку');
      burgerCunstructor.constructorBunBottom.contains('Выберите булки');
    });

    afterEach(() => {
      cy.clearAllCookies();
      localStorage.removeItem('refreshToken');
    });
  });
});
