import CheckoutPageObject from '../../../support/pages/checkout.page-object';
import AccountPageObject from '../../../support/pages/account.page-object';

let product = {};

describe('Checkout: Basic', { tags: ['@workflow', '@checkout'] }, () => {
    beforeEach(() => {
        return cy.setToInitialState()
            .then(() => {
                return cy.createProductFixture();
            })
            .then(() => {
                return cy.fixture('product');
            })
            .then((result) => {
                product = result;
                return cy.createCustomerFixtureStorefront();
            })
            .then(() => {
                cy.visit('/');
            });
    });

    it.only('@workflow @checkout: basic checkout workflow', () => {
        const page = new CheckoutPageObject();
        const accountPage = new AccountPageObject();

        // Product detail
        cy.get('.header-search-input')
            .type(product.name);
        cy.get('.search-suggest-product-name').contains(product.name);

        cy.get('.search-suggest-product-name').click();

        cy.get('.product-detail-buy .btn-buy').click();

        // Off canvas
        cy.get('.offcanvas').should('be.visible');
        cy.get('.cart-item-price').contains('64');
        cy.contains('Close Cart').should('be.visible');
        cy.contains('Close Cart').click();

        cy.wait(1000);
        cy.scrollTo('top');
        cy.get('.header-cart-total').contains('64');
        cy.get('.header-cart-total').click({force: true});
        cy.get('.offcanvas').should('be.visible');

        cy.get(`${page.elements.cartItem}-label`).contains(product.name);

        // Checkout
        cy.get('.offcanvas-cart-actions .begin-checkout-btn').click();

        cy.get('.login-collapse-toggle').click();

        // Login
        cy.get('.checkout-main').should('be.visible');
        cy.get('#loginCollapse').click();

        cy.get('#loginMail').type('test@example.com');
        cy.get('#loginPassword').type('shopware');
        cy.get(`${accountPage.elements.loginSubmit} [type="submit"]`).click();

        // Confirm
        cy.get('.confirm-tos .card-title').contains('Terms and conditions and cancellation policy');

        cy.get('.confirm-tos .form-check-input').scrollIntoView();
        cy.get('.confirm-tos .form-check-input').click(1, 1);
        cy.get('.confirm-address').contains('Pep Eroni');
        cy.get(`${page.elements.cartItem}-details-container ${page.elements.cartItem}-label`).contains(product.name);
        cy.get(`${page.elements.cartItem}-total-price`).contains(product.price[0].gross);

        // Finish checkout
        cy.get('#confirmFormSubmit').scrollIntoView();
        cy.get('#confirmFormSubmit').click();

        cy.get('.finish-header').contains('Thank you for your order with Demostore!');
        cy.get('.checkout-aside-summary-total').contains(product.price[0].gross);
        cy.get('.col-5.checkout-aside-summary-value').contains('10.22');
    });
});
