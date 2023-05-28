import { defineConfig } from 'cypress'
import * as dotenv from 'dotenv'

dotenv.config({ path: __dirname + '/../../.env' })

module.exports = defineConfig({
  env: {
    codeCoverage: {
      url: `${process.env.API_PROTOCOL}://${process.env.API_HOST}:${process.env.API_PORT}/coverage`,
    },
  },
  e2e: {
    specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: `${process.env.UI_PROTOCOL}://${process.env.UI_HOST}:${process.env.UI_PORT}`,
    setupNodeEvents(on, config) {
      require('@cypress/code-coverage/task')(on, config)
      return config
    },
  },
})
