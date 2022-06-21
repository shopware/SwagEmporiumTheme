import products from '../../../../fixtures/listing-pagination-products.json';

describe('CMS: Search Page', {tags: ['@workflow', '@cms']}, () => {
    beforeEach(() => {
        cy.setToInitialState()
            .then(() => {
                Array.from(products).forEach(cy.createProductFixture);
            })
    });

    it('should show search result page', () => {
        cy.visit('/');

        cy.get('#searchCollapse .header-search-input:visible').type('Test').type('{enter}');

        cy.takeSnapshot('[Search] Result page');
    });
});
