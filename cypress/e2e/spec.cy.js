describe('Cypress 101 Assignment', () => {

  it('Cenário 1: Drag & Drop Slider', () => {

    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Minified React error')) {
        return false;
      }
    });

    cy.visit('https://www.testmuai.com/selenium-playground/', {
      timeout: 60000
    });

    cy.contains('Drag & Drop Sliders', { timeout: 20000 }).click();

    cy.url().should('include', 'drag-drop-range-sliders-demo');

    cy.wait(3000);

    cy.get('h4')
      .contains('Default value 15')
      .parent()
      .find('input[type="range"]')
      .then($slider => {

        const slider = $slider[0];

        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ).set;

        nativeSetter.call(slider, '95');

        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));

      });

    cy.wait(2000);

    cy.get('#rangeSuccess', { timeout: 10000 })
      .should('contain', '95');

  });



  it('Cenário 2: Input Form Submit + Acessibilidade + Performance', () => {

    Cypress.on('uncaught:exception', () => false);

    cy.visit('https://www.testmuai.com/selenium-playground/', {
      timeout: 60000
    });

    cy.viewport('samsung-note9');

    cy.xpath("//a[text()='Input Form Submit']", { timeout: 20000 })
      .click();

    cy.wait(3000);

    cy.injectAxe({
      axeCorePath: 'node_modules/axe-core/axe.min.js'
    });

    cy.checkA11y(null, null, null, true);

    cy.wait(1000);

    cy.get('#name', { timeout: 15000 })
      .type('Emanuel Carlos do Nascimento Junior');

    cy.get('#inputEmail4')
      .type('emanuelnascimentojr2@gmail.com');

    cy.get('#inputPassword4')
      .type('139007');

    cy.get('#company')
      .type('ATIVA');

    cy.get('input[name="website"]')
      .type('https://example.com');

    cy.get('select[name="country"]')
      .select('Brazil');

    cy.get('#inputCity')
      .type('Santa Rita');

    cy.get('#inputAddress1')
      .type('Rua 1');

    cy.get('#inputAddress2')
      .type('QA');

    cy.get('#inputState')
      .type('MG');

    cy.get('#inputZip')
      .type('37537424');

    cy.wait(2000);

    cy.get('form#seleniumform button[type="submit"]', { timeout: 10000 })
      .click();

    cy.get('.success-msg', { timeout: 20000 })
      .should('contain', 'Thanks');

  });

});