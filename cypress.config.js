const { defineConfig } = require("cypress");
// Certifique-se de que a instalação do passo 1 terminou antes de rodar o Cypress novamente
const { lighthouse, prepareAudit } = require("@cypress-audit/lighthouse"); 

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });
      on("task", {
        lighthouse: lighthouse(),
      });
    },
  },
});