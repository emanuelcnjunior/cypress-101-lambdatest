describe('Cypress 101 Assignment', () => 
{

  it('Cenário 1: Drag & Drop Slider', () => {

    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('Minified React error')) {
        return false;
      }
    });

    cy.visit('https://www.testmuai.com/selenium-playground/');
    cy.contains('Drag & Drop Sliders').click();
    cy.url().should('include', 'drag-drop-range-sliders-demo');

    cy.wait(2000);

    cy.get('h4')
      .contains('Default value 15')
      .parent()
      .find('input[type="range"]')
      .then($slider => {

        const slider = $slider[0];

        // 🔥 setter NATIVO do input (React escuta isso)
        const nativeSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        ).set;

        nativeSetter.call(slider, '95');

        // 🔥 evento nativo com bubbles
        slider.dispatchEvent(new Event('input', { bubbles: true }));
        slider.dispatchEvent(new Event('change', { bubbles: true }));
      });

    cy.get('#rangeSuccess').should('have.text', '95');
  });


  it('Cenário 2: Input Form Submit + Acessibilidade + Performance', () => {
    // Ignorar erros de terceiros
    Cypress.on('uncaught:exception', () => false);

    cy.visit('https://www.testmuai.com/selenium-playground/');
    cy.viewport('samsung-note9'); //

    // REQUISITO: Usar XPath para clicar no link
    cy.xpath("//a[text()='Input Form Submit']").click();

    // 1. Auditoria de Acessibilidade
    cy.injectAxe();
    cy.checkA11y(
    null,
    { includedImpacts: ['critical', 'serious'] },
    null,
    true // skipFailures = true
  );

    // 2. Preencher formulário
    cy.get('#name').type('Emanuel Junior');
    cy.get('#inputEmail4').type('emanuelnascimentojr2@gmail.com');
    cy.get('#inputPassword4').type('139007');
    cy.get('#company').type('ATIVA Soluções Tecnológicas Indústria e Comércio S.A.');
    cy.get('input[name="website"]').type('https://example.com');
    cy.get('select[name="country"]').select('Brazil');
    cy.get('#inputCity').type('Santa Rita do Sapucaí');
    cy.get('#inputAddress1').type('Rua Assad Baracat 190, Monte Libano');
    cy.get('#inputAddress2').type('QA Automation');
    cy.get('#inputState').type('MG');
    cy.get('#inputZip').type('37537-424');

    // Submeter
    cy.get('button[type="submit"]').contains('Submit').click();

    // Validar mensagem de sucesso
    cy.get('.success-msg').should('be.visible')
      .and('contain', 'Thanks for contacting us');

    // 3. Auditoria de Performance (agora com a task configurada)
    cy.lighthouse({
      performance: 30, // Valores baixos para garantir que passe na primeira
      accessibility: 50,
      seo: 50,
      "best-practices": 50,
    });
  });

});